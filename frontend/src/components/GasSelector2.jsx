import React from 'react';

const GasSelector2 = ({ selectedGas, onChange }) => {
    const gases = ["CO2", "CH4", "NO2", "Other GHGs"];
    return (
        <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-700">Select Gas (For Sector Forecast):</label>
            <select
                className="border p-2 rounded w-full"
                value={selectedGas}
                onChange={(e) => onChange(e.target.value)}
            >
                {gases.map(gas => (
                    <option key={gas} value={gas}>{gas}</option>
                ))}
            </select>
        </div>
    );
};

export default GasSelector2;
