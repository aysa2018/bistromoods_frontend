// src/components/Login.js
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset the error message before each login attempt
        setLoading(true); // Start loading indicator

        if (!email || !password) {
            setError("Please enter both email and password.");
            setLoading(false); // Stop loading
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
                onLogin();  // Call this prop if you need to trigger other actions on successful login
                // Save the token if you have one in response
                // localStorage.setItem("token", data.token);
            } else {
                const errorData = await response.json();
                if (response.status === 401) {
                    setError("Invalid email or password. Please try again.");
                } else if (response.status === 404) {
                    setError("User not found. Please check your email.");
                } else {
                    setError(errorData.detail || "Something went wrong. Please try again.");
                }
            }
        } catch (err) {
            setError("Unable to connect to the server. Please check your internet connection.");
        } finally {
            setLoading(false); // Stop loading after request completes
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Login</h2>
            {error && <p style={styles.error}>{error}</p>} {/* Display error message */}
            {loading && <p style={styles.loading}>Logging in...</p>} {/* Display loading message */}
            <form onSubmit={handleSubmit} style={styles.form}>
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
                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    title: {
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        padding: '12px',
        marginBottom: '15px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ddd',
    },
    button: {
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
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

export default Login;