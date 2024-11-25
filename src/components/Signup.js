import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import './Signup.css';

const Signup = ({ onSignup }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // For error messages
    const [loading, setLoading] = useState(false); // For loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state
        setLoading(true); // Start loading state

        // Validate fields before making the API call
        if (!username || !email || !password) {
            setError("Please fill in all fields.");
            setLoading(false); // Stop loading
            return;
        }

        try {
            // Make a POST request to the FastAPI signup endpoint
            await axios.post('http://127.0.0.1:8000/users/', {
                Username: username,
                Email: email,
                Password: password,
                Preferences: {}, // Send empty preferences if not used
            });

            // Clear form and show success
            setUsername("");
            setEmail("");
            setPassword("");
            onSignup(); // Call the onSignup callback if signup is successful
            alert("Signup successful!"); // Simple success feedback

        } catch (err) {
            // Handle specific error responses from the API
            if (err.response && err.response.data && err.response.data.detail) {
                setError(err.response.data.detail);
            } else {
                setError("Signup failed. Please try again.");
            }
        } finally {
            setLoading(false); // Stop loading state
        }
    };

    return (
        <div className="signup-page">
            <img src="/logo512.png" alt="BistroMoods Logo" className="signup-logo" />
            <div className="signup-container">
                <h2 className="signup-title">Sign Up</h2>
                {error && <p className="signup-error">{error}</p>}
                {loading && <p className="signup-loading">Creating your account...</p>}
                <form onSubmit={handleSubmit} className="signup-form">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="signup-input"
                        disabled={loading}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="signup-input"
                        disabled={loading}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="signup-input"
                        disabled={loading}
                    />
                    <button type="submit" className="signup-button" disabled={loading}>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;