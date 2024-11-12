// src/App.js
import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
    // Check localStorage to see if user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [showSignup, setShowSignup] = useState(false);

    useEffect(() => {
        // Update localStorage whenever isLoggedIn changes
        localStorage.setItem('isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn'); // Clear login state on logout
    };

    const toggleSignup = () => {
        setShowSignup((prev) => !prev);
    };

    return (
        <div className="App">
            {isLoggedIn ? (
                // Show HomePage and Logout button when logged in
                <>
                    <HomePage />
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                // Show Welcome message, Login, or Signup options when not logged in
                <div>
                    <h1>Welcome to BistroMoods</h1>
                    {showSignup ? (
                        // Signup form and toggle option to switch to Login form
                        <>
                            <Signup onSignup={handleLogin} />
                            <p>
                                Already have an account?{" "}
                                <button onClick={toggleSignup}>Login</button>
                            </p>
                        </>
                    ) : (
                        // Login form and toggle option to switch to Signup form
                        <>
                            <Login onLogin={handleLogin} />
                            <p>
                                Don’t have an account?{" "}
                                <button onClick={toggleSignup}>Sign up</button>
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
