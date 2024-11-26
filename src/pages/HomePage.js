import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Filter from '../components/Filter';
import PromptInput from '../components/PromptInput';
import RestaurantList from '../components/RestaurantList';
import { searchRestaurantsByUserInput } from '../api'; // Import the updated API function

const HomePage = ({ savedRestaurants, onSaveRestaurant, onLogout }) => {
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [filters, setFilters] = useState({
        rating: '',
        price_range: '',
        dietary_restriction: '',
        special_feature: '',
        neighborhoods: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userPrompt, setUserPrompt] = useState('');

    const handleFilterChange = useCallback((name, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!userPrompt) return;

            setLoading(true);
            setError(null);

            try {
                const data = await searchRestaurantsByUserInput(userPrompt, filters);
                setFilteredRestaurants(data);
            } catch (error) {
                setError('An error occurred while fetching restaurants.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filters, userPrompt]);

    const handleUserPromptExtracted = (extractedPrompt) => {
        setUserPrompt(extractedPrompt || '');
    };

    return (
        <div className="home-page" style={styles.homePage}>
            <Header title="BistroMoods" onLogout={onLogout} /> {/* Pass onLogout */}
            <div style={styles.content}>
                <aside style={styles.sidebar}>
                    <Filter onFilterChange={handleFilterChange} />
                </aside>
                <main style={styles.mainContent}>
                    <h1 style={styles.welcomeHeader}>Welcome to BistroMoods</h1>
                    <h2 style={styles.subtitle}><em>Let's Find Your Vibe</em></h2>
                    <PromptInput onUserInputExtracted={handleUserPromptExtracted} />
                    <div className="recommended-restaurants">
                        {loading && <p>Matching your vibe...</p>}
                        {error && <p style={styles.error}>{error}</p>}
                        <RestaurantList
                            restaurants={filteredRestaurants}
                            onSaveRestaurant={onSaveRestaurant} // Pass save handler
                        />
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
        marginTop: '150px', // Adds space above the main content
    },
    welcomeHeader: {
        marginTop: '40px', // Moves the header further down
        textAlign: 'center',
    },
    subtitle: {
        marginTop: '10px', // Adds spacing below the main header
        fontSize: '1.5rem', // Adjusts font size for the subtitle
        textAlign: 'center',
        color: '#fff', // Makes the subtitle white
        fontStyle: 'italic', // Italicizes the subtitle
    },
    error: {
        color: 'red',
        fontWeight: 'bold',
    },
};

export default HomePage;