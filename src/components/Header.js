// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Header component with title and profile link
const Header = ({ title }) => {
    const navigate = useNavigate();

    // Navigate to profile page on click
    const handleProfileClick = () => {
        navigate('/profile'); // Redirect to /profile
    };

    return (
        <header style={styles.header}>
            <h1 style={styles.title}>{title}</h1>
            <span
                style={styles.profileLink}
                onClick={handleProfileClick}
            >
                Profile
            </span>
        </header>
    );
};

// Styling for Header component
const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '10px 20px',
        backgroundColor: '#415d43',
        borderBottom: '1px solid #ccc',
    },
    title: {
        margin: 0,
        fontSize: '1.5rem',
    },
    profileLink: {
        fontSize: '1rem',
        color: '#007bff', // Blue color
        textDecoration: 'underline', // Underlined
        cursor: 'pointer', // Pointer cursor to mimic a link
    },
};

export default Header;