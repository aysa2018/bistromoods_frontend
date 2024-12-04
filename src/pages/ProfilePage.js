import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import pinIcon from './pin.png'; // Import the custom pin image

// Define the custom icon using Leaflet's L.icon
const customIcon = L.icon({
    iconUrl: pinIcon,
    iconSize: [38, 38], // Customize size as needed
    iconAnchor: [19, 38], // Anchor point for the bottom-center alignment
    popupAnchor: [0, -38], // Popup position relative to the marker
});

const ProfilePage = ({ savedRestaurants, onUnsaveRestaurant, username, email }) => {
    const navigate = useNavigate();

    // Debugging: Ensure savedRestaurants contains valid data
    console.log("Saved Restaurants:", savedRestaurants);

    // Default map center (fallback if no restaurants saved)
    const defaultCenter = [40.7128, -74.0060]; // New York City coordinates

    // Determine the center dynamically if restaurants are saved
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
                {/* Render markers for restaurants with valid coordinates */}
                {savedRestaurants
                    .filter(
                        (restaurant) =>
                            restaurant.Latitude !== undefined &&
                            restaurant.Longitude !== undefined
                    )
                    .map((restaurant) => (
                        <Marker
                            key={restaurant.RestaurantID}
                            position={[restaurant.Latitude, restaurant.Longitude]}
                            icon={customIcon} // Use the custom icon here
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

            {/* Back to Home Button */}
            <button
                className="back-to-home-button"
                onClick={() => navigate('/')}
            >
                Back to Home
            </button>
        </div>
    );
};



export default ProfilePage;
