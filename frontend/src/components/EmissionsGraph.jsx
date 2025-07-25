import React, { useEffect } from "react";
import Plot from "react-plotly.js";

const EmissionsGraph = ({ years, emissions }) => {
    useEffect(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, [years]);

    // Handle missing or empty data
    if (!years || !emissions || years.length === 0 || emissions.length === 0) {
        return (
            <div className="text-center text-gray-500 mt-6">
                ⚠️ Emission trend data not available.
            </div>
        );
    }

    return (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center text-blue-800">
                📊 Overall Emission Forecast (Actual + Predicted)
            </h2>

            <Plot
                data={[
                    {
                        x: years,
                        y: emissions,
                        type: "scatter",
                        mode: "lines+markers",
                        marker: { color: "#10B981", size: 8 },
                        line: {
                            shape: "spline",
                            color: "#1D4ED8",
                            width: 3,
                        },
                        name: "Emission Trend",
                        fill: "tozeroy",
                        fillcolor: "rgba(59, 130, 246, 0.15)",
                    },
                    {
                        x: [years[years.length - 1]],
                        y: [emissions[emissions.length - 1]],
                        mode: "markers+text",
                        marker: { color: "red", size: 12 },
                        text: ["Forecast"],
                        textposition: "top center",
                        name: "Forecast Point",
                    },
                ]}
                layout={{
                    autosize: true,
                    height: 420,
                    title: {
                        text: "📈 Emissions by Year (Forecast Highlighted)",
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
                            text: "Total CO₂e Emissions",
                            font: {
                                size: 14,
                                color: "#374151",
                            },
                        },
                        gridcolor: "#E5E7EB",
                    },
                    margin: { t: 60, l: 60, r: 30, b: 50 },
                    plot_bgcolor: "#F9FAFB",
                    paper_bgcolor: "#FFFFFF",
                }}
                config={{
                    responsive: true,
                    displayModeBar: true,
                    displaylogo: false,
                    modeBarButtonsToAdd: [
                        "zoomIn2d", "zoomOut2d", "autoScale2d", "resetScale2d", "toImage"
                    ],
                    modeBarButtonsToRemove: [
                        "lasso2d", "select2d", "toggleSpikelines"
                    ],
                }}
                style={{ width: "100%", height: "450px" }}
            />
        </div>
    );
};

export default EmissionsGraph;
