import React, { useState, useEffect } from 'react';

const Filter = ({ onFilterChange }) => {
    // State for selected neighborhoods
    const [selectedNeighborhoods, setSelectedNeighborhoods] = useState([]);

    // Define boroughs and neighborhoods matching the backend `neighborhoods.py`
    const neighborhoods = {
        Manhattan: [
            "Harlem",
            "Upper East Side",
            "Upper West Side",
            "Midtown",
            "Chelsea",
            "West Village",
            "SoHo",
            "East Village",
            "Tribeca",
            "Financial District",
        ],
        Brooklyn: [
            "Williamsburg",
            "DUMBO",
            "Brooklyn Heights",
            "Park Slope",
            "Bushwick",
            "Downtown Brooklyn",
        ],
        Queens: [
            "Astoria",
            "Long Island City",
            "Flushing",
            "Forest Hills",
            "Jackson Heights",
        ],
    };

    // Handle neighborhood checkbox changes
    const handleNeighborhoodChange = (neighborhood) => {
        setSelectedNeighborhoods((prev) =>
            prev.includes(neighborhood)
                ? prev.filter((n) => n !== neighborhood)
                : [...prev, neighborhood]
        );
    };

    // Handle "Select All" for a borough
    const handleSelectAll = (borough) => {
        const boroughNeighborhoods = neighborhoods[borough];
        const allSelected = boroughNeighborhoods.every((n) => selectedNeighborhoods.includes(n));
        setSelectedNeighborhoods((prev) =>
            allSelected
                ? prev.filter((n) => !boroughNeighborhoods.includes(n)) // Remove all
                : [...prev, ...boroughNeighborhoods.filter((n) => !prev.includes(n))] // Add missing
        );
    };

    // Convert selected neighborhoods to a string format suitable for the backend
    useEffect(() => {
        const selectedNeighborhoodString = selectedNeighborhoods.join(",").toLowerCase(); // Convert to lowercase for backend compatibility
        onFilterChange("neighborhoods", selectedNeighborhoodString);
    }, [selectedNeighborhoods, onFilterChange]);

    // Handle changes in dropdowns and pass to parent component (HomePage)
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange(name, value);
    };

    return (
        <div style={styles.filterContainer}>
            <h3>Filter by:</h3>
            
            {/* Price Range */}
            <div style={styles.filterGroup}>
                <label>Price Range</label>
                <select name="price_range" style={styles.select} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            {/* Distance Range */}
            <div style={styles.filterGroup}>
                <label>Distance Range</label>
                <select name="distance_range" style={styles.select} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Near">Near</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Far">Far</option>
                </select>
            </div>

            {/* Dietary Restrictions */}
            <div style={styles.filterGroup}>
                <label>Dietary Restrictions</label>
                <select name="dietary_restriction" style={styles.select} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Gluten-Free">Gluten-Free</option>
                </select>
            </div>

            {/* Special Features */}
            <div style={styles.filterGroup}>
                <label>Special Features</label>
                <select name="special_feature" style={styles.select} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Family Friendly">Family Friendly</option>
                    <option value="Pet Friendly">Pet Friendly</option>
                    <option value="Outdoor Seating">Outdoor Seating</option>
                </select>
            </div>

            {/* Borough and Neighborhood Filters */}
            <h4>Neighborhoods</h4>
            {Object.keys(neighborhoods).map((borough) => (
                <div key={borough} style={styles.boroughSection}>
                    <label>
                        <input
                            type="checkbox"
                            checked={neighborhoods[borough].every((n) => selectedNeighborhoods.includes(n))}
                            onChange={() => handleSelectAll(borough)}
                        />
                        {borough} (Select All)
                    </label>
                    <div style={{ paddingLeft: "20px" }}>
                        {neighborhoods[borough].map((neighborhood) => (
                            <label key={neighborhood} style={{ display: "block" }}>
                                <input
                                    type="checkbox"
                                    checked={selectedNeighborhoods.includes(neighborhood)}
                                    onChange={() => handleNeighborhoodChange(neighborhood)}
                                />
                                {neighborhood}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

// Styling for Filter component
const styles = {
    filterContainer: {
        width: '200px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginRight: '20px',
    },
    filterGroup: {
        marginBottom: '15px',
    },
    select: {
        width: '100%',
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    boroughSection: {
        marginBottom: '15px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '10px',
    },
};

export default Filter;
