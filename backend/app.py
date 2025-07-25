from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import hashlib
import random
import sys
sys.path.append('../src')
from src.preprocess import load_and_clean_data

app = Flask(__name__)
CORS(app)

# ✅ Load model trained on test1_fixed.csv
model = joblib.load("models/emission_model.pkl")

# ✅ Path to the cleaned data
DATA_PATH = "data/test1_fixed.csv"


@app.route("/predict", methods=["GET"])
def predict():
    substance = request.args.get("substance", "CO2")

    try:
        X, y, df_raw = load_and_clean_data(DATA_PATH, substance_filter=substance)
    except KeyError as e:
        return jsonify({"error": str(e)}), 500

    if X.empty or y.empty:
        return jsonify({"error": f"No data found for substance: {substance}"}), 200

    # ✅ Load feature names and filter X
    try:
        feature_names = joblib.load("models/features.pkl")
        X = X[feature_names]
    except Exception as e:
        return jsonify({"error": f"Feature mismatch: {str(e)}"}), 500

    predictions = model.predict(X)
    df_raw = df_raw.reset_index(drop=True)
    df_raw["Actual"] = y.values
    df_raw["Predicted"] = predictions
    df_raw["Label"] = df_raw["Industry Code"].astype(str) + " (" + df_raw["Year"].astype(str) + ")"

    return jsonify({
        "data": df_raw[["Label", "Actual", "Predicted"]].to_dict(orient="records")
    })



@app.route("/forecast", methods=["POST"])
def forecast():
    data = request.get_json()
    sector_code = data.get("industry_code")
    substance = data.get("substance", "CO2")

    if not sector_code:
        return jsonify({"error": "No sector code provided"}), 400

    print(f"[DEBUG] Forecast request for sector: {sector_code}, substance: {substance}")

    # ✅ Always return dummy forecast for demo
    base_year = 2020
    future_years = list(range(base_year + 1, base_year + 16))

    # Deterministic seed using sector + gas
    key = f"{sector_code}_{substance}"
    hash_digest = hashlib.sha256(key.encode()).hexdigest()
    seed_int = int(hash_digest, 16) % (10**8)
    random.seed(seed_int)

    forecast_values = [round(random.uniform(0.1, 1.0), 3) for _ in range(15)]

    print("[DEBUG] Using deterministic dummy forecast for demo.")

    return jsonify({
        "industry_code": sector_code,
        "base_year": base_year,
        "forecast_years": future_years,
        "forecast_values": forecast_values,
        "note": "Demo mode: dummy forecast returned for all inputs"
    })


@app.route("/trend", methods=["POST"])
def sector_trend():
    data = request.get_json()
    sector_code = data.get("industry_code")
    substance = data.get("substance", "CO2")

    if not sector_code:
        return jsonify({"error": "Missing industry_code"}), 400

    try:
        _, _, df = load_and_clean_data(DATA_PATH, substance_filter=substance, sector_filter=sector_code)
    except KeyError as e:
        return jsonify({"error": str(e)}), 500

    if df.empty:
        return jsonify({"years": [], "emissions": []})

    df["Year"] = pd.to_numeric(df["Year"], errors="coerce")
    df = df.groupby("Year")["Supply Chain Emission Factors with Margins"].mean().reset_index()

    return jsonify({
        "years": df["Year"].tolist(),
        "emissions": df["Supply Chain Emission Factors with Margins"].round(3).tolist()
    })


if __name__ == "__main__":
    app.run(debug=True)
