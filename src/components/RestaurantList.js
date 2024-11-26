import React from 'react';
import '../App.css'; // Import custom CSS for styling

const RestaurantList = ({ restaurants, onSaveRestaurant }) => {
    return (
        <div className="restaurant-list">
            {restaurants.map((restaurant) => (
                <div
                    key={restaurant.RestaurantID}
                    className="restaurant-card"
                    onClick={() => {
                        if (restaurant.YelpURL) {
                            window.open(restaurant.YelpURL, '_blank');
                        } else {
                            alert('Link not available!');
                        }
                    }}
                >
                    {/* Wrapper for Save Button */}
                    <div className="save-button-wrapper">
                        <button
                            className="save-button"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent card click
                                onSaveRestaurant(restaurant);
                            }}
                        >
                            Save
                        </button>
                    </div>
                    <h3>{restaurant.Name}</h3>
                    <p><strong>Cuisine:</strong> {restaurant.CuisineType}</p>
                    <p><strong>Address:</strong> {restaurant.Address}</p>
                    <p><strong>Rating:</strong> {restaurant.Rating}</p>
                    <p><strong>Price Range:</strong> {restaurant.PriceRange}</p>
                </div>
            ))}
        </div>
    );
};

export default RestaurantList;