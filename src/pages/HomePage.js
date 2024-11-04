// src/pages/HomePage.js
// src/pages/HomePage.js
import React, { useState } from 'react';
import Header from '../components/Header';
import Filter from '../components/Filter';
import PromptInput from '../components/PromptInput';
import RestaurantList from '../components/RestaurantList';
import { mockRestaurants } from '../mockData';

const HomePage = () => {
    const [keywords, setKeywords] = useState([]);

    const handleKeywordsExtracted = (extractedKeywords) => {
        setKeywords(extractedKeywords);
    };

    // Filter restaurants based on keywords
    const filteredRestaurants = mockRestaurants.filter((restaurant) =>
        keywords.some((keyword) =>
            restaurant.Keywords.includes(keyword.toLowerCase())
        )
    );

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
                    <div className="recommended-restaurants">
                        
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
};

export default HomePage;
