import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import pinIcon from './pin.png'; // Default pin icon
import starIcon from './star.png'; // Another option for pin icon

// Define icons
const icons = {
    pin: L.icon({
        iconUrl: pinIcon,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38],
    }),
    star: L.icon({
        iconUrl: starIcon,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38],
    }),
};

const ProfilePage = ({ savedRestaurants, onUnsaveRestaurant, username, email }) => {
    const navigate = useNavigate();
    const [iconSelections, setIconSelections] = useState({}); // Tracks selected icons for restaurants

    // Handle icon change for a restaurant
    const handleIconChange = (restaurantID, selectedIcon) => {
        setIconSelections((prev) => ({
            ...prev,
            [restaurantID]: selectedIcon,
        }));
    };

    // Default map center
    const defaultCenter = [40.7128, -74.0060];
    const mapCenter = savedRestaurants.length > 0
        ? [savedRestaurants[0].Latitude || 0, savedRestaurants[0].Longitude || 0]
        : defaultCenter;

    return (
        <div style={styles.profilePage}>
            <h1>Profile Page</h1>
            <h2>Welcome, {username || 'Guest'}</h2>
            <p>Email: {email || 'No email provided'}</p>

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

                            {/* Icon Selection */}
                            <label htmlFor={`icon-select-${restaurant.RestaurantID}`}>
                                Choose Marker Icon:
                            </label>
                            <select
                                id={`icon-select-${restaurant.RestaurantID}`}
                                value={iconSelections[restaurant.RestaurantID] || 'pin'}
                                onChange={(e) =>
                                    handleIconChange(restaurant.RestaurantID, e.target.value)
                                }
                            >
                                <option value="pin">Default Pin</option>
                                <option value="star">Star Icon</option>
                            </select>

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

            <h2>Saved Restaurants Map</h2>
            <MapContainer
                center={mapCenter}
                zoom={13}
                style={{ height: '500px', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {savedRestaurants.map((restaurant) => (
                    <Marker
                        key={restaurant.RestaurantID}
                        position={[restaurant.Latitude, restaurant.Longitude]}
                        icon={
                            icons[iconSelections[restaurant.RestaurantID]] || icons.pin
                        } // Use selected icon or default
                    >
                        <Popup>
                            <strong>{restaurant.Name}</strong>
                            <br />
                            {restaurant.Address}
                            <br />
                            Rating: {restaurant.Rating}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <button
                className="back-to-home-button"
                onClick={() => navigate('/')}
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
