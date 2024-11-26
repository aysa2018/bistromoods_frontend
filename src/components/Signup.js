import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios
import './Signup.css';

const Signup = ({ onSignup }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!username || !email || !password) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        try {
            await axios.post('http://127.0.0.1:8000/users/', {
                Username: username,
                Email: email,
                Password: password,
                Preferences: {},
            });

            setUsername("");
            setEmail("");
            setPassword("");
            onSignup();
        } catch (err) {
            setError(err.response?.data?.detail || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
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
            {/* "Already have an account? Sign In" Section */}
            <div className="signup-login-container">
                <p className="signup-login-text">Already have an account?</p>
                <button
                    className="signup-login-button"
                    onClick={() => navigate("/login")}
                    disabled={loading}
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default Signup;