import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!email || !password) {
            setError("Please enter both email and password.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ Email: email, Password: password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful:", data);
                onLogin();
            } else {
                const errorData = await response.json();
                setError(errorData.detail || "Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("Unable to connect to the server. Please check your internet connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            {/* Logo positioned above the login box */}
            <img src="/logo512.png" alt="BistroMoods Logo" className="login-logo" />
            <div className="login-container">
                <h2 className="login-title">Login</h2>
                {error && <p className="login-error">{error}</p>}
                {loading && <p className="login-loading">Logging in...</p>}
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                        disabled={loading}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        disabled={loading}
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;