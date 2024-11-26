import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import ProfilePage from './pages/ProfilePage';

function App() {
    // Authentication and Saved Restaurants State
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [savedRestaurants, setSavedRestaurants] = useState([]);

    // Store login status in localStorage
    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);

    // Handle Login and Logout
    const handleLogin = () => setIsLoggedIn(true);
    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        setSavedRestaurants([]); // Clear saved restaurants on logout
    };

    // Save a restaurant
    const handleSaveRestaurant = (restaurant) => {
        setSavedRestaurants((prev) => {
            if (!prev.find((r) => r.RestaurantID === restaurant.RestaurantID)) {
                console.log("Saving restaurant:", restaurant); // Debug log
                return [...prev, restaurant]; // Add restaurant if not already saved
            }
            console.log("Restaurant already saved:", restaurant); // Debug log
            return prev; // Avoid duplicates
        });
    };

    // Unsave a restaurant
    const handleUnsaveRestaurant = (restaurantID) => {
        setSavedRestaurants((prev) => prev.filter((r) => r.RestaurantID !== restaurantID));
    };

    return (
        <Router>
            <Routes>
                {isLoggedIn ? (
                    <>
                        {/* Protected Routes */}
                        <Route
                            path="/"
                            element={
                                <HomePage
                                    onSaveRestaurant={handleSaveRestaurant}
                                    savedRestaurants={savedRestaurants}
                                    onLogout={handleLogout} // Pass handleLogout to HomePage
                                />
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProfilePage
                                    savedRestaurants={savedRestaurants}
                                    onUnsaveRestaurant={handleUnsaveRestaurant}
                                />
                            }
                        />
                        <Route
                            path="*"
                            element={<Navigate to="/" replace />} // Redirect invalid paths to HomePage
                        />
                    </>
                ) : (
                    <>
                        {/* Public Routes */}
                        <Route
                            path="/"
                            element={<Login onLogin={handleLogin} />}
                        />
                        <Route
                            path="/signup"
                            element={<Signup onSignup={handleLogin} />}
                        />
                        <Route
                            path="*"
                            element={<Navigate to="/" replace />} // Redirect invalid paths to login
                        />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;