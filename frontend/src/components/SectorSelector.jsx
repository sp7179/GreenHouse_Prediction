import React from 'react';

const SectorSelector = ({ onSelect }) => {
    const sectors = [
        "111CA", "113FF", "211", "212", "213", "22", "23", "311FT", "313TT",
        "315AL", "321", "322", "323", "324", "325", "326", "327", "331", "332",
        "333", "334", "335", "3361MV", "3364OT", "337", "339", "42", "441",
        "445", "452", "481", "482", "483", "484", "485", "486", "487OS", "493",
        "4A0", "511", "512", "513", "514", "521CI", "523", "524", "525",
        "532RL", "5411", "5412OP", "5415", "55", "561", "562", "61", "621",
        "622", "623", "624", "711AS", "713", "721", "722", "81", "HS", "ORE"
    ];

    return (
        <div>
            <label className="block mb-2 font-medium">Select Sector Code:</label>
            <select
                className="border p-2 rounded w-full"
                onChange={(e) => onSelect(e.target.value)}
            >
                <option value="">-- Choose Sector --</option>
                {sectors.map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                ))}
            </select>
        </div>
    );
};

export default SectorSelector;
