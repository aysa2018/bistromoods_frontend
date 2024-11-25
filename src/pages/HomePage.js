import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Filter from '../components/Filter';
import PromptInput from '../components/PromptInput';
import RestaurantList from '../components/RestaurantList';
import { searchRestaurantsByUserInput } from '../api'; // Import the updated API function

// Main HomePage component
const HomePage = () => {
    // State to hold the list of filtered restaurants
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    // State to hold selected filter values
    const [filters, setFilters] = useState({
        rating: '', // Minimum rating filter
        price_range: '', // Price range filter ('Low', 'Medium', 'High')
        dietary_restriction: '', // Dietary restriction filter (e.g., 'Vegan')
        special_feature: '', // Special feature filter (e.g., 'Family Friendly')
    });

    // Loading indicator to show while data is being fetched
    const [loading, setLoading] = useState(false);

    // Error message state for handling errors
    const [error, setError] = useState(null);

    // State to store user input from the PromptInput component
    const [userPrompt, setUserPrompt] = useState('');

    // Function to handle filter changes
    const handleFilterChange = (name, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value, // Update only the filter that changed
        }));
    };

    // Fetch restaurant data whenever userPrompt or filters change
    useEffect(() => {
        const fetchData = async () => {
            // Skip fetch if userPrompt is empty
            if (!userPrompt) return;

            setLoading(true); // Start loading indicator
            setError(null); // Clear previous errors

            try {
                // Call the API with userPrompt and filters
                const data = await searchRestaurantsByUserInput(userPrompt, filters);

                // Update the state with the fetched restaurant data
                setFilteredRestaurants(data);
            } catch (error) {
                // Log and set an error message if the API call fails
                console.error("Error fetching restaurants:", error);
                setError("An error occurred while fetching restaurants.");
            } finally {
                setLoading(false); // Stop loading indicator
            }
        };

        fetchData(); // Trigger the fetch function
    }, [filters, userPrompt]); // Dependencies: Re-run when filters or userPrompt changes

    // Function to handle user input extraction from PromptInput
    const handleUserPromptExtracted = (extractedPrompt) => {
        // Set userPrompt with the extracted value or clear it if empty
        setUserPrompt(extractedPrompt || '');
    };

    return (
        <div className="home-page" style={styles.homePage}>
            {/* Header component with a title */}
            <Header title="BistroMoods" username="username" />

            <div style={styles.content}>
                {/* Sidebar with filter options */}
                <aside style={styles.sidebar}>
                    <Filter onFilterChange={handleFilterChange} /> {/* Pass filter handler */}
                </aside>

                <main style={styles.mainContent}>
                    <h1>Welcome to BistroMoods</h1>

                    {/* PromptInput component to capture user input */}
                    <PromptInput onUserInputExtracted={handleUserPromptExtracted} />

                    {/* Display loading, error message, or the restaurant list */}
                    <div className="recommended-restaurants">
                        {loading && <p>Loading restaurants...</p>} {/* Show while loading */}
                        {error && <p style={styles.error}>{error}</p>} {/* Show error if any */}
                        <RestaurantList restaurants={filteredRestaurants} /> {/* Display results */}
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
