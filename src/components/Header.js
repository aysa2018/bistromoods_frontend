import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, onLogout }) => {
    const navigate = useNavigate();

    // Navigate to profile page on button click
    const handleProfileClick = () => {
        navigate('/profile'); // Redirect to /profile
    };

    return (
        <header style={styles.header}>
            <h1 style={styles.title}>{title}</h1>
            <div style={styles.actions}>
                <button className="header-button profile-button" onClick={handleProfileClick}>
                    Profile
                </button>
                <button className="header-button logout-button" onClick={onLogout}>
                    Logout
                </button>
            </div>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '10px 20px',
        backgroundColor: '#415d43', // Keep the background consistent
        borderBottom: '1px solid #ccc',
    },
    title: {
        margin: 0,
        fontSize: '1.5rem',
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px', // Space between buttons
    },
};

export default Header;