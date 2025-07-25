import React from "react";
import Plot from "react-plotly.js";

const SectorTrend = ({ years, emissions, sector }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
            <h2 className="text-xl font-bold mb-4 text-center text-green-800">
                📉 Emission Trend for <span className="text-blue-700">{sector}</span>
            </h2>
            <Plot
                data={[
                    {
                        x: years,
                        y: emissions,
                        type: "scatter",
                        mode: "lines+markers",
                        marker: { color: "green", size: 8 },
                        line: {
                            shape: "spline",
                            color: "green",
                            width: 3,
                        },
                        name: "Avg CO₂e Emissions",
                        fill: "tozeroy",
                        fillcolor: "rgba(34,197,94,0.15)",
                    },
                ]}
                layout={{
                    title: {
                        text: "📈 Emission Over Time (with Forecast)",
                        font: {
                            size: 20,
                            color: "#1F2937",
                        },
                        xref: "paper",
                        x: 0.05,
                    },
                    xaxis: {
                        title: {
                            text: "Time (Index or Year)",
                            font: {
                                size: 14,
                                color: "#374151",
                            },
                        },
                        showgrid: true,
                        zeroline: false,
                    },
                    yaxis: {
                        title: {
                            text: "Avg CO₂e Emissions",
                            font: {
                                size: 14,
                                color: "#374151",
                            },
                        },
                        gridcolor: "#E5E7EB",
                    },
                    margin: { t: 60, l: 50, r: 30, b: 50 },
                    plot_bgcolor: "#F9FAFB",
                    paper_bgcolor: "#FFFFFF",
                }}
                config={{
                    responsive: true,
                    scrollZoom: false,
                    displayModeBar: true,
                    displaylogo: false,
                    modeBarButtonsToRemove: [
                        "lasso2d", "select2d", "toggleSpikelines"
                    ],
                    modeBarButtonsToAdd: [
                        "zoomIn2d", "zoomOut2d", "autoScale2d", "resetScale2d", "toImage"
                    ],
                }}
                style={{ width: "100%", height: "450px" }}
            />
        </div>
    );
};

export default SectorTrend;
