import joblib
from sklearn.ensemble import RandomForestRegressor
from src.preprocess import load_and_clean_data
# from preprocess import load_and_clean_data  # Uncomment if running standalone

def train_model(csv_path="data/test1_fixed.csv", substance_filter="CO2"):
    # Load full cleaned dataset
    X, y, _ = load_and_clean_data(csv_path, substance_filter=substance_filter)

    if X.empty or y.empty:
        print("❌ No data available to train the model.")
        return

    # ✅ Only keep columns that will be used during forecast
    required_features = ["Industry Code Encoded", "Year"]
    missing = [col for col in required_features if col not in X.columns]
    if missing:
        print(f"❌ Missing required features: {missing}")
        return

    X = X[required_features]

    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)

    print(f"✅ Train R²: {model.score(X, y):.4f}")

    # Save model and feature names
    joblib.dump(model, "models/emission_model.pkl")
    joblib.dump(X.columns.tolist(), "models/features.pkl")

    print("✅ Model and features saved to 'models/'")

# if __name__ == "__main__":
#     train_model()
