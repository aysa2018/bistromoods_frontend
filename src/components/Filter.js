// src/components/Filter.js
import React from 'react';

const Filter = ({ onFilterChange }) => {
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

            {/* Special Filters */}
            <div style={styles.filterGroup}>
                <label>Special Features</label>
                <select name="special_feature" style={styles.select} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="family friendly">Family Friendly</option>
                    <option value="pet friendly">Pet Friendly</option>
                    <option value="outdoor seating">Outdoor Seating</option>
                </select>
            </div>
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
};

export default Filter;
