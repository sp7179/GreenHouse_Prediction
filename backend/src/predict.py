import joblib
import pandas as pd
from src.preprocess import load_and_clean_data
# from preprocess import load_and_clean_data  # Use this if running outside src/ context

def predict():
    model = joblib.load("models/emission_model.pkl")
    feature_names = joblib.load("models/features.pkl")

    # Load data (no substance filter so it works on all)
    X, _, _ = load_and_clean_data("data/test1_fixed.csv")

    # Ensure only required features are used
    X = X[feature_names]

    predictions = model.predict(X)
    result_df = X.copy()
    result_df["Predicted Emissions"] = predictions

    return result_df

# if __name__ == "__main__":
#     result = predict()
#     print("✅ Prediction output:")
#     print(result.head())
