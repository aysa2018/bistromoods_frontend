// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import ProfilePage from './pages/ProfilePage';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [showSignup, setShowSignup] = useState(false);

    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);

    const handleLogin = () => setIsLoggedIn(true);
    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    };

    const toggleSignup = () => setShowSignup((prev) => !prev);

    return (
        <Router>
            <Routes>
                {isLoggedIn ? (
                    <>
                        {/* Protected Routes */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/profile" element={<ProfilePage />} />
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
                            element={
                                <div>
                                    {/* <h1>Welcome to BistroMoods</h1> */}
                                    {showSignup ? (
                                        <>
                                            <Signup onSignup={handleLogin} />
                                            <p>
                                                Already have an account?{" "}
                                                <button onClick={toggleSignup}>Login</button>
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <Login onLogin={handleLogin} />
                                            <p>
                                                Don’t have an account?{" "}
                                                <button onClick={toggleSignup}>Sign up</button>
                                            </p>
                                        </>
                                    )}
                                </div>
                            }
                        />
                        <Route
                            path="*"
                            element={<Navigate to="/" replace />} // Redirect invalid paths to login
                        />
                    </>
                )}
            </Routes>
            {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        </Router>
    );
}

export default App;