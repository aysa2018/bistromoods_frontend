import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ savedRestaurants, onUnsaveRestaurant, username, email }) => {
    const navigate = useNavigate();

    const handleBackToHomeClick = () => {
        navigate('/'); // Redirect to home page
    };

    return (
        <div style={styles.profilePage}>
            <h1>Profile Page</h1>

            <h2>Saved Restaurants</h2>
            {savedRestaurants.length === 0 ? (
                <p>No saved restaurants yet.</p>
            ) : (
                <div className="restaurant-list">
                    {savedRestaurants.map((restaurant) => (
                        <div key={restaurant.RestaurantID} className="restaurant-card">
                            <h3>{restaurant.Name}</h3>
                            <p><strong>Cuisine:</strong> {restaurant.CuisineType}</p>
                            <p><strong>Address:</strong> {restaurant.Address}</p>
                            <p><strong>Rating:</strong> {restaurant.Rating}</p>
                            <p><strong>Price Range:</strong> {restaurant.PriceRange}</p>
                            <button
                                className="unsave-button"
                                onClick={() => onUnsaveRestaurant(restaurant.RestaurantID)}
                            >
                                Unsave
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Back to Home Button */}
            <button
                className="back-to-home-button"
                onClick={handleBackToHomeClick}
            >
                Back to Home
            </button>
        </div>
    );
};

const styles = {
    profilePage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
};

export default ProfilePage;