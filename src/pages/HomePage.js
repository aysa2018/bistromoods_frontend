// src/pages/HomePage.js
import React, { useState } from 'react';
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
        <div>
            <h1>Welcome to BistroMoods</h1>
            <PromptInput onKeywordsExtracted={handleKeywordsExtracted} />
            <RestaurantList restaurants={filteredRestaurants} />
        </div>
    );
};

export default HomePage;
