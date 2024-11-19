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
            const response = await axios.post('http://127.0.0.1:8000/users/', {
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
        <div style={styles.container}>
            <h2 style={styles.title}>Sign Up</h2>
            {error && <p style={styles.error}>{error}</p>} {/* Display error message */}
            {loading && <p style={styles.loading}>Creating your account...</p>} {/* Display loading state */}
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                    disabled={loading} // Disable input during loading
                />
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    disabled={loading} // Disable input during loading
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    disabled={loading} // Disable input during loading
                />
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? "Signing Up..." : "Sign Up"} {/* Show dynamic button text */}
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    title: {
        marginBottom: "20px",
        fontSize: "24px",
        color: "#333",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    input: {
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "1px solid #ddd",
    },
    button: {
        width: "100%",
        padding: "12px",
        fontSize: "16px",
        color: "#fff",
        backgroundColor: "#007bff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    error: {
        color: "red",
        marginBottom: "10px",
        fontSize: "14px",
        textAlign: "center",
    },
    loading: {
        color: "blue",
        marginBottom: "10px",
        fontSize: "14px",
        textAlign: "center",
    },
};

export default Signup;