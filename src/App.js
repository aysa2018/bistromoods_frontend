// src/App.js
import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const toggleSignup = () => {
        setShowSignup((prev) => !prev);
    };

    return (
        <div className="App">
            {isLoggedIn ? (
                <HomePage />
            ) : (
                <div>
                    <h1>Welcome to BistroMoods</h1>
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
            )}
        </div>
    );
}

export default App;
