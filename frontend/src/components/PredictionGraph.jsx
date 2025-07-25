import React from "react";
import Plot from "react-plotly.js";

const gasUnits = {
    CO2: "CO₂ (Metric Tons)",
    CH4: "CH₄ (Metric Tons)",
    N2O: "N₂O (Metric Tons)",
    "Other GHGs": "Other Greenhouse Gases (Metric Tons)"
};

const PredictionGraph = ({ resultData, selectedGas }) => {
    if (!resultData || resultData.length === 0) return null;

    const labels = resultData.map(d => d.Label);
    const actual = resultData.map(d => d.Actual);
    const predicted = resultData.map(d => d.Predicted);
    const gasLabel = gasUnits[selectedGas] || `${selectedGas} Emissions`;

    return (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center text-purple-800">
                📉 Actual vs Predicted Emissions ({selectedGas})
            </h2>

            <Plot
                data={[
                    {
                        x: labels,
                        y: actual,
                        type: "scatter",
                        mode: "lines+markers",
                        name: "🔴 Actual Emissions",
                        marker: { color: "#EF4444" },
                        line: { width: 2 }
                    },
                    {
                        x: labels,
                        y: predicted,
                        type: "scatter",
                        mode: "lines+markers",
                        name: "🔵 Predicted Emissions",
                        marker: { color: "#3B82F6" },
                        line: { width: 2 }
                    }
                ]}
                layout={{
                    title: {
                        text: `Emission Comparison for ${selectedGas}`,
                        font: { size: 18 },
                        x: 0.05
                    },
                    xaxis: {
                        title: "📅 Sector-Year Combination",
                        tickangle: -45,
                        automargin: true
                    },
                    yaxis: {
                        title: `📊 Emission Values (${gasLabel})`,
                        gridcolor: "#E5E7EB"
                    },
                    legend: {
                        orientation: "h",
                        y: -0.3,
                        x: 0.5,
                        xanchor: "center",
                        bgcolor: "#F3F4F6",
                        bordercolor: "#D1D5DB",
                        borderwidth: 1,
                        font: {
                            family: "Arial",
                            size: 12,
                            color: "#111827"
                        }
                    },
                    margin: { t: 50, l: 70, r: 30, b: 120 },
                    plot_bgcolor: "#F9FAFB",
                    paper_bgcolor: "#FFFFFF"
                }}
                config={{ responsive: true }}
                style={{ width: "100%", height: "450px" }}
            />
        </div>
    );
};

export default PredictionGraph;
