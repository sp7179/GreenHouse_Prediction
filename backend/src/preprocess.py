import pandas as pd

def load_and_clean_data(csv_path, substance_filter=None, sector_filter=None):
    df = pd.read_csv(csv_path)

    # Step 1: Clean column names
    df.columns = (
        df.columns.str.strip()
        .str.replace('\n', ' ')
        .str.replace('\r', ' ')
        .str.replace(r'\s+', ' ', regex=True)
    )

    print("Raw columns:")
    print(df.columns.tolist())

    # Step 2: Add 'Year' if missing
    if 'Year' not in df.columns:
        print("⚠️ 'Year' column missing. Adding default value 2020...")
        df['Year'] = 2020

    # Step 3: Check required columns
    required_cols = [
        "Year",
        "Industry Code",
        "Substance",
        "Supply Chain Emission Factors with Margins"
    ]
    missing = [col for col in required_cols if col not in df.columns]
    if missing:
        raise KeyError(f"Missing columns in dataset: {missing}")

    # Step 4: Normalize values
    df["Industry Code"] = df["Industry Code"].astype(str).str.strip()
    df["Substance"] = df["Substance"].astype(str).str.strip().str.lower()

    # Step 5: Map standard gas names
    gas_map = {
        "CO2": "carbon dioxide",
        "CH4": "methane",
        "NO2": "nitrous oxide",
        "OTHER": "other ghgs"
    }
    if substance_filter:
        gas_name = gas_map.get(substance_filter.upper())
        if gas_name:
            df = df[df["Substance"] == gas_name]

    # Step 6: Filter by sector
    if sector_filter:
        df = df[df["Industry Code"] == str(sector_filter).strip()]

    # Step 7: Convert to numeric
    df["Year"] = pd.to_numeric(df["Year"], errors="coerce")
    df["Supply Chain Emission Factors with Margins"] = pd.to_numeric(
        df["Supply Chain Emission Factors with Margins"], errors="coerce"
    )

    # Step 8: Drop nulls
    df = df.dropna(subset=["Year", "Supply Chain Emission Factors with Margins", "Industry Code"])

    # Step 9: Encode industry
    df["Industry Code Encoded"] = df["Industry Code"].astype("category").cat.codes
    df["Data Index"] = df["Industry Code"] + "_" + df["Year"].astype(int).astype(str)

    # Step 10: Define features dynamically
    numeric_cols = df.select_dtypes(include="number").columns.tolist()
    if "Supply Chain Emission Factors with Margins" in numeric_cols:
        numeric_cols.remove("Supply Chain Emission Factors with Margins")
    X = df[numeric_cols]
    y = df["Supply Chain Emission Factors with Margins"]

    return X, y, df
