import React, { useEffect, useState } from 'react';
import SectorSelector from './components/SectorSelector';
import ForecastCard from './components/ForecastCard';
import EmissionsGraph from './components/EmissionsGraph';
import SectorTrend from './components/SectorTrend';
import Loader from './components/Loader';
import axios from 'axios';
import PredictionGraph from './components/PredictionGraph';
import GasSelector from './components/GasSelector';
import GasSelector2 from './components/GasSelector2';

const App = () => {
  // 🔹 VISUAL 1: Actual vs Predicted
  const [predictionData, setPredictionData] = useState([]);
  const [selectedGas1, setSelectedGas1] = useState("CO2");

  // 🔹 VISUAL 2: Forecast & Trend
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedGas2, setSelectedGas2] = useState("CO2");
  const [result, setResult] = useState(null); // updated to store all forecast data
  const [trendData, setTrendData] = useState({ years: [], emissions: [] });

  const [loading, setLoading] = useState(false);

  // 🔄 Fetch Actual vs Predicted
  const fetchPrediction = async (gas) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://127.0.0.1:5000/predict?substance=${encodeURIComponent(gas)}`);
      setPredictionData(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Error loading predictions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrediction(selectedGas1);
  }, [selectedGas1]);

  // 🔄 Fetch Forecast & Trend
  const handleForecast = async () => {
    if (!selectedSector || !selectedGas2) {
      alert("Please select both sector and gas.");
      return;
    }

    setLoading(true);
    setResult(null);
    setTrendData({ years: [], emissions: [] });

    try {
      const res = await axios.post('http://127.0.0.1:5000/forecast', {
        industry_code: selectedSector,
        substance: selectedGas2
      });

      setResult(res.data || null); // forecast_years, forecast_values, note

      const trendRes = await axios.post('http://127.0.0.1:5000/trend', {
        industry_code: selectedSector,
        substance: selectedGas2
      });

      setTrendData({
        years: trendRes.data.years || [],
        emissions: trendRes.data.emissions || []
      });

    } catch (err) {
      console.error("Forecast/Trend error:", err);
      alert("Error loading forecast/trend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        🌱 Greenhouse Gas Emission Predictor
      </h1>

      {/* 🔹 VISUAL 1 */}
      <div className="mb-10 border-b pb-8">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">🔹 Actual vs Predicted (All Data)</h2>
        <GasSelector selectedGas={selectedGas1} onChange={setSelectedGas1} />
        {loading && <Loader />}
        {predictionData.length > 0 && (
          <PredictionGraph resultData={predictionData} selectedGas={selectedGas1} />
        )}
      </div>

      {/* 🔹 VISUAL 2 */}
      <div>
        <h2 className="text-xl font-semibold text-green-800 mb-2">🔹 Sector Forecast & Trend</h2>
        <GasSelector2 selectedGas={selectedGas2} onChange={setSelectedGas2} />
        <SectorSelector onSelect={setSelectedSector} />

        <button
          onClick={handleForecast}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow mt-4 mb-6 w-full transition"
          disabled={!selectedSector || loading}
        >
          Forecast & View Trend
        </button>

        {loading && <Loader />}
        {result && (
          <ForecastCard
            sector={selectedSector}
            forecast_years={result.forecast_years}
            forecast_values={result.forecast_values}
            note={result.note}
          />
        )}
        {/* {trendData.years.length > 0 && (
          <SectorTrend
            years={trendData.years}
            emissions={trendData.emissions}
            sector={selectedSector}
            gas={selectedGas2}
          />
        )} */}
      </div>
    </div>
  );
};

export default App;
