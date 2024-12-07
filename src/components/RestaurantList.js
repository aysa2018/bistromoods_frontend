import React, { useState } from "react";
import "../App.css"; // Import custom CSS for styling

const RestaurantList = ({ restaurants, onSaveRestaurant }) => {
    const [savedRestaurants, setSavedRestaurants] = useState([]);
    const [bookingLinks, setBookingLinks] = useState({}); // Store booking links for restaurants

    // Google API credentials (use .env for production)
    const API_KEY ="AIzaSyCG1uIsLcLzTL761Ei17edOG_I7BmGE9n0";
    const CX ="d7630a4fbdab44448";
    
    /**
     * Fetches the booking link for a restaurant using Google Custom Search API.
     * @param {string} restaurantName - Name of the restaurant to search for.
     * @returns {string|null} - URL of the booking page or null if not found.
     */
    const fetchBookingLink = async (restaurantName) => {
        const query = `${restaurantName} New York booking`;
        const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            const firstResult = data.items?.[0]; // Get the first result
            return firstResult?.link || null;
        } catch (error) {
            console.error("Error fetching booking link:", error);
            return null;
        }
    };

    /**
     * Handles the click event for saving a restaurant.
     * Updates the savedRestaurants state and notifies the parent component.
     * @param {Object} restaurant - Restaurant object to save.
     */
    const handleSaveClick = (restaurant) => {
        if (!savedRestaurants.includes(restaurant.RestaurantID)) {
            setSavedRestaurants([...savedRestaurants, restaurant.RestaurantID]); // Mark as saved
            onSaveRestaurant(restaurant); // Notify parent
        }
    };

    /**
     * Handles the click event for the "Book" button.
     * Opens a booking link or fetches one if not already available.
     * @param {Object} restaurant - Restaurant object to book.
     */
    const handleBookClick = async (restaurant) => {
        if (bookingLinks[restaurant.RestaurantID]) {
            window.open(bookingLinks[restaurant.RestaurantID], "_blank");
        } else {
            const link = await fetchBookingLink(restaurant.Name);
            if (link) {
                setBookingLinks((prevLinks) => ({
                    ...prevLinks,
                    [restaurant.RestaurantID]: link,
                }));
                window.open(link, "_blank");
            } else {
                alert("Booking link not available!");
            }
        }
    };

    return (
        <div className="restaurant-list">
            {restaurants.map((restaurant) => (
                <div
                    key={restaurant.RestaurantID}
                    className="restaurant-card"
                    onClick={() => {
                        if (restaurant.YelpURL) {
                            window.open(restaurant.YelpURL, "_blank");
                        } else {
                            alert("Link not available!");
                        }
                    }}
                >
                    {/* Wrapper for Save and Book Buttons */}
                    <div className="save-button-wrapper">
                        {/* Book Button */}
                        <button
                            className="book-button"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent card click
                                handleBookClick(restaurant);
                            }}
                        >
                            Book
                        </button>

                        {/* Save Button */}
                        <button
                            className={
                                savedRestaurants.includes(restaurant.RestaurantID)
                                    ? "saved-button"
                                    : "save-button"
                            }
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent card click
                                handleSaveClick(restaurant);
                            }}
                            disabled={savedRestaurants.includes(restaurant.RestaurantID)} // Disable if already saved
                        >
                            {/* Star icon only */}
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
