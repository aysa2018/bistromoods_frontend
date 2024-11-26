import React, { useState, useEffect } from 'react';

const Filter = ({ onFilterChange }) => {
    const [selectedNeighborhoods, setSelectedNeighborhoods] = useState([]);

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

    const handleNeighborhoodChange = (neighborhood) => {
        setSelectedNeighborhoods((prev) =>
            prev.includes(neighborhood)
                ? prev.filter((n) => n !== neighborhood)
                : [...prev, neighborhood]
        );
    };

    const handleSelectAll = (borough) => {
        const boroughNeighborhoods = neighborhoods[borough];
        const allSelected = boroughNeighborhoods.every((n) => selectedNeighborhoods.includes(n));
        setSelectedNeighborhoods((prev) =>
            allSelected
                ? prev.filter((n) => !boroughNeighborhoods.includes(n))
                : [...prev, ...boroughNeighborhoods.filter((n) => !prev.includes(n))]
        );
    };

    useEffect(() => {
        const selectedNeighborhoodString = selectedNeighborhoods.join(",").toLowerCase();
        onFilterChange("neighborhoods", selectedNeighborhoodString);
    }, [selectedNeighborhoods, onFilterChange]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange(name, value);
    };

    return (
        <div style={styles.filterContainer}>
            <h3>Filter by:</h3>
            
            <div style={styles.filterGroup}>
                <label style={styles.label}>Price Range</label>
                <select name="price_range" style={styles.select} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div style={styles.filterGroup}>
                <label style={styles.label}>Dietary Restrictions</label>
                <select name="dietary_restriction" style={styles.select} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Gluten-Free">Gluten-Free</option>
                </select>
            </div>

            <div style={styles.filterGroup}>
                <label style={styles.label}>Special Features</label>
                <select name="special_feature" style={styles.select} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Family Friendly">Family Friendly</option>
                    <option value="Pet Friendly">Pet Friendly</option>
                    <option value="Outdoor Seating">Outdoor Seating</option>
                </select>
            </div>

            <label style={styles.label}>Neighborhoods</label>
            {Object.keys(neighborhoods).map((borough) => (
                <div key={borough} style={styles.boroughSection}>
                    <label style={styles.label}>
                        <input
                            type="checkbox"
                            style={styles.checkbox}
                            checked={neighborhoods[borough].every((n) => selectedNeighborhoods.includes(n))}
                            onChange={() => handleSelectAll(borough)}
                        />
                        {borough} (Select All)
                    </label>
                    <div style={{ paddingLeft: "20px" }}>
                        {neighborhoods[borough].map((neighborhood) => (
                            <div key={neighborhood} style={styles.filterGroup}>
                                <label style={styles.label}>
                                    <input
                                        type="checkbox"
                                        style={styles.checkbox}
                                        checked={selectedNeighborhoods.includes(neighborhood)}
                                        onChange={() => handleNeighborhoodChange(neighborhood)}
                                    />
                                    {neighborhood}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const styles = {
    filterContainer: {
        width: '200px',
        padding: '20px',
        backgroundColor: 'var(--card-background)',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        color: 'var(--text-color)',
        fontFamily: 'var(--body-font)',
        position: 'relative', // Ensures it moves independently
        top: '250px', // Moves the filter section lower
        left: '-150px', // Moves the filter section further to the left
    },
    filterGroup: {
        marginBottom: '15px',
    },
    select: {
        width: '100%',
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--secondary-color)',
        color: 'var(--primary-color)',
        fontFamily: 'var(--body-font)',
    },
    boroughSection: {
        marginBottom: '15px',
        border: '1px solid var(--border-color)',
        borderRadius: '5px',
        padding: '10px',
        backgroundColor: 'var(--secondary-color)',
        color: 'var(--primary-color)',
    },
    checkbox: {
        marginRight: '8px',
        accentColor: 'var(--primary-color)',
    },
    label: {
        fontSize: '14px',
        fontFamily: 'var(--body-font)',
        color: 'var(--primary-color)',
    },
};

export default Filter;