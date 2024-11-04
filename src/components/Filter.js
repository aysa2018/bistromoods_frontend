// src/components/Filter.js
import React from 'react';

const Filter = () => {
    return (
        <div style={styles.filterContainer}>
            <h3>Filter by:</h3>
            
            {/* Price Range */}
            <div style={styles.filterGroup}>
                <label>Price Range</label>
                <select style={styles.select}>
                    <option value="">Select</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            {/* Distance Range */}
            <div style={styles.filterGroup}>
                <label>Distance Range</label>
                <select style={styles.select}>
                    <option value="">Select</option>
                    <option value="near">Near</option>
                    <option value="moderate">Moderate</option>
                    <option value="far">Far</option>
                </select>
            </div>

            {/* Dietary Restrictions */}
            <div style={styles.filterGroup}>
                <label>Dietary Restrictions</label>
                <select style={styles.select}>
                    <option value="">Select</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="glutenFree">Gluten-Free</option>
                </select>
            </div>

            {/* Special Filters */}
            <div style={styles.filterGroup}>
                <label>Special Filters</label>
                <select style={styles.select}>
                    <option value="">Select</option>
                    <option value="familyFriendly">Family Friendly</option>
                    <option value="petFriendly">Pet Friendly</option>
                    <option value="outdoorSeating">Outdoor Seating</option>
                </select>
            </div>
        </div>
    );
};

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
