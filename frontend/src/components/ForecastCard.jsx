import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    AreaChart,
    Area,
} from "recharts";

const ForecastCard = ({ sector, substance, forecast_years, forecast_values, note }) => {
    // Build chart data with year and prediction values
    const chartData = forecast_years.map((year, index) => ({
        year: year.toString(),
        prediction: forecast_values[index],
    }));

    return (
        <div className="bg-white shadow-xl p-5 rounded-2xl mb-6">
            <h2 className="text-xl font-bold mb-2 text-gray-800">
                📈 15-Year Emission Forecast
            </h2>

            <p className="text-sm text-gray-600 mb-1">
                Forecast for <strong className="text-black">{sector}</strong> sector — <strong className="text-blue-600">{substance}</strong>
            </p>

            {note && (
                <p className="text-xs text-yellow-600 mb-3">
                    {/* ⚠️ {note} */}
                </p>
            )}

            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -5 }} />
                    <YAxis label={{ value: "Emissions (tons)", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="prediction"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colorPrediction)"
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ForecastCard;
