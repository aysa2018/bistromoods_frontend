// src/components/RestaurantList.js
import React from 'react';

const RestaurantList = ({ restaurants }) => (
    <div>
        <h2>Recommended Restaurants</h2>
        {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
                <div key={restaurant.RestaurantID}>
                    <h3>{restaurant.Name}</h3>
                    <p>Cuisine: {restaurant.CuisineType}</p>
                    <p>Ambiance: {restaurant.Ambiance}</p>
                    <p>Rating: {restaurant.Rating}</p>
                </div>
            ))
        ) : (
            <p>No matching restaurants found for your mood.</p>
        )}
    </div>
);

export default RestaurantList;
