// src/pages/HomePage.js
import React, { useState } from 'react';
import Header from '../components/Header';
import Filter from '../components/Filter';
import PromptInput from '../components/PromptInput';
import RestaurantList from '../components/RestaurantList';
import { searchRestaurantsByKeyword } from '../api'; // import the API helper

const HomePage = () => {
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleKeywordsExtracted = async (extractedKeywords) => {
        const keyword = extractedKeywords[0] || ''; // Use the first extracted keyword for search

        setLoading(true);
        setError(null); // Clear any previous errors

        try {
            // Use searchRestaurantsByKeyword function instead of fetch
            const data = await searchRestaurantsByKeyword(keyword);
            if (data.length > 0) {
                setFilteredRestaurants(data);
            } else {
                setFilteredRestaurants([]); // Clear results if no restaurants found
                setError("No restaurants found matching your criteria.");
            }
        } catch (error) {
            console.error("Error fetching restaurants:", error);
            setFilteredRestaurants([]);
            setError("An error occurred while fetching restaurants.");
        }

        setLoading(false);
    };

    return (
        <div className="home-page" style={styles.homePage}>
            <Header title="BistroMoods" username="username" />

            <div style={styles.content}>
                <aside style={styles.sidebar}>
                    <Filter />
                </aside>

                <main style={styles.mainContent}>
                    <h1>Welcome to BistroMoods</h1>
                    <PromptInput onKeywordsExtracted={handleKeywordsExtracted} />
                    
                    {/* Display loading, error, or restaurant list */}
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
