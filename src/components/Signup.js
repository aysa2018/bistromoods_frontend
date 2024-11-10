// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ onSignup }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // For error messages
    const [loading, setLoading] = useState(false); // For loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted!");
        setLoading(true); // Set loading state
        
        try {
            // Make a POST request to the FastAPI signup endpoint
            const response = await axios.post('http://127.0.0.1:8000/users/', {
                Username: username,
                Email: email,
                Password: password,
                Preferences: {}  // Send empty preferences if not used
            });

            // Clear form and show success
            setUsername("");
            setEmail("");
            setPassword("");
            setError(null);  // Clear any previous error
            onSignup();  // Call the onSignup callback if signup is successful
            alert("Signup successful!");

        } catch (err) {
            setError("Signup failed. Please try again.");
        } finally {
            setLoading(false); // End loading state
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;