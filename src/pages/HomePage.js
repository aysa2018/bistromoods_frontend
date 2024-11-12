// src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Filter from '../components/Filter';
import PromptInput from '../components/PromptInput';
import RestaurantList from '../components/RestaurantList';
import { searchRestaurantsByKeyword } from '../api';

// Main HomePage component
const HomePage = () => {
    const [filteredRestaurants, setFilteredRestaurants] = useState([]); // State to hold filtered restaurant data
    const [filters, setFilters] = useState({
        price_range: '',
        distance_range: '',
        dietary_restriction: '',
        special_feature: '',
    }); // State to hold filter selections
    const [loading, setLoading] = useState(false); // Loading indicator
    const [error, setError] = useState(null); // Error handling
    const [keyword, setKeyword] = useState(''); // Keyword state for searching

    // Function to handle changes in filters
    const handleFilterChange = (name, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value, // Update only the filter that changed
        }));
    };

    // Fetch data whenever filters or keyword changes
    useEffect(() => {
        const fetchData = async () => {
            // Skip fetch if no keyword is entered
            if (!keyword) return;

            setLoading(true); // Start loading
            setError(null); // Clear previous errors

            try {
                // Fetch data from backend with keyword and filters
                const data = await searchRestaurantsByKeyword(keyword, filters);
                setFilteredRestaurants(data); // Update restaurant list
            } catch (error) {
                console.error("Error fetching restaurants:", error);
                setError("An error occurred while fetching restaurants."); // Set error if fetch fails
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchData(); // Execute data fetch function
    }, [filters, keyword]); // Dependencies: re-run when filters or keyword changes

    // Handle keywords extracted from PromptInput
    const handleKeywordsExtracted = (extractedKeywords) => {
        setKeyword(extractedKeywords[0] || ''); // Use first extracted keyword if available
    };

    return (
        <div className="home-page" style={styles.homePage}>
            <Header title="BistroMoods" username="username" />

            <div style={styles.content}>
                {/* Sidebar with Filter component */}
                <aside style={styles.sidebar}>
                    <Filter onFilterChange={handleFilterChange} />
                </aside>

                <main style={styles.mainContent}>
                    <h1>Welcome to BistroMoods</h1>
                    
                    {/* PromptInput for keyword extraction */}
                    <PromptInput onKeywordsExtracted={handleKeywordsExtracted} />

                    {/* Loading, error, and restaurant list display */}
                    <div className="recommended-restaurants">
                        {loading && <p>Loading restaurants...</p>}
                        {error && <p style={styles.error}>{error}</p>}
                        <RestaurantList restaurants={filteredRestaurants} />
                    </div>
                </main>
            </div>
        </div>
    );
};

// Styling for the HomePage component
const styles = {
    homePage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    content: {
        display: 'flex',
        width: '100%',
        maxWidth: '1000px',
    },
    sidebar: {
        flex: '0 0 200px',
    },
    mainContent: {
        flex: '1',
        paddingLeft: '20px',
    },
    error: {
        color: 'red',
        fontWeight: 'bold',
    },
};

export default HomePage;
