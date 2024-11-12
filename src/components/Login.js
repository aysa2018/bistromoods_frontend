// src/components/Login.js
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                setError(errorData.detail || "Login failed");
            }
        } catch (err) {
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
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
    buttonHover: {
        backgroundColor: '#0056b3',
    },
};

export default Login;
