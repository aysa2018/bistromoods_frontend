// src/components/RestaurantList.js
import React from 'react';

const RestaurantList = ({ restaurants }) => {
    return (
        <div>
            <h2>Recommended Restaurants</h2>
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant.RestaurantID}>
                        <h3>{restaurant.Name}</h3>
                        <p>Cuisine: {restaurant.CuisineType}</p>
                        <p>Address: {restaurant.Address}</p>
                        <p>Rating: {restaurant.Rating}</p>
                        <p>Price Range: {restaurant.PriceRange}</p>
                        <p>Ambiance: {restaurant.Ambiance}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantList;
