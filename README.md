# 🌱 Greenhouse Gas Emission Predictor

> **Forecast the future. Understand the present. Protect the planet.**

---

## 📌 Overview

The **Greenhouse Gas Emission Predictor** is an AI-driven web application that predicts future emissions for different sectors using historical data and machine learning. With a sleek UI, interactive charts, and actionable insights, this tool empowers:

* 🌍 Environmental scientists
* 🏛️ Policymakers
* 📊 Climate researchers
* 👨‍💻 Data-driven developers

To make informed, climate-conscious decisions.

---

## 🚀 Features at a Glance

| 💡 Feature                      | 🌟 Description                                                |
| ------------------------------- | ------------------------------------------------------------- |
| 🏭 **Sector-Wise Forecasting**  | Select from Energy, Transportation, Agriculture, etc.         |
| 📈 **Live Data Visualization**  | Interactive line charts showing Actual vs Predicted emissions |
| 🧠 **AI-Powered Predictions**   | Utilizes Random Forest Regressor on cleaned sector data       |
| 📆 **15-Year Forecast Horizon** | Predict future GHG emissions from historical trends           |
| 💻 **Modern Web UI**            | Built using React, Tailwind CSS, and smooth transitions       |
| 🔌 **Flask REST API Backend**   | Dynamic API endpoints serving graph and prediction data       |

---

## 🛠️ Tech Stack

| Layer        | Technology                   |
| ------------ | ---------------------------- |
| 🌐 Frontend  | React.js, Tailwind CSS, Vite |
| ⚙️ Backend   | Flask, Python 3.11           |
| 🤖 ML Model  | Scikit-learn (RandomForest)  |
| 📊 Graphing  | Matplotlib, Seaborn          |
| 🧹 Data Prep | Pandas, NumPy                |

---

## 🖼️ Visual Showcase

> Replace these placeholders in your Canva doc with real screenshots:

1. 🧭 **Sector Dropdown Selection**

   * ![Dropdown Screenshot](./screenshots/dropdown.png)

2. 📊 **Actual vs Predicted Emissions Graph**

   * ![Graph Screenshot](./screenshots/graph.png)

3. ⚡ **Loading State & Animated Output**

   * ![Prediction UI](./screenshots/predict.png)

---

## 🧪 How It Works

1. **User selects a sector** from the dropdown.
2. **Flask backend** processes the request.
3. **Model predicts** 15 years of emissions for CO2, CH4, N2O, and other gases.
4. **Graph image is returned** to the frontend and displayed with animations.

🎯 Ideal for visual learners and analysts who prefer interpretable AI outputs.

---

## 🧰 Project Structure

```bash
├── src/
│   ├── train.py              # Model training
│   ├── preprocess.py         # Data cleaning & formatting
│   ├── predict.py            # Core prediction logic
│
├── app.py                   # Flask API entry point
├── frontend/                # React + Tailwind UI
│   ├── main.jsx
│   ├── App.jsx
│   └── components/
└── data/
    └── test1_fixed.csv      # Cleaned dataset
```

---

## 🧠 Machine Learning Model

* 📌 **Algorithm**: Random Forest Regressor
* 📊 **Inputs**: Yearly sector emissions (CO2, CH4, N2O, Other GHGs)
* 🔍 **Output**: Predicted emission values for next 15 years
* 🎯 **Key Feature**: Unique forecast for each sector & each gas type

---

## 🛠️ Getting Started

### ▶️ Backend (Flask API)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### 💻 Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

> 📌 Note: Ensure Flask is running before starting the frontend to avoid API call failures.

---

## 🙋‍♂️ Author & Contributions

**👨‍💻 Shourish Paul**
🔗 [GitHub](https://github.com/shourishpaul) ・ ✉️ `shourishpaul@gmail.com`
🌿 Passionate about AI for good, sustainability, and building future-facing tech.

---

## 📄 License

Licensed under the [MIT License](./LICENSE). Free to use, modify, and share.

---

> 🌎 *This project is more than just code — it's a step toward a sustainable future.*
> **Make it count. Let data drive climate action.**
