import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ onLogout }) => {
    const navigate = useNavigate();

    // Navigate to profile page on button click
    const handleProfileClick = () => {
        navigate('/profile'); // Redirect to /profile
    };

    return (
        <header style={styles.header}>
            <img
                src="/logo512.png" // Path to the logo in the public folder
                alt="BistroMoods Logo"
                style={styles.logo}
            />
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
        padding: '20px 20px', // Increased padding for a thicker header
        backgroundColor: '#415d43', // Consistent background color
        height: '80px', // Fixed height for consistency
        boxSizing: 'border-box', // Ensure padding is included in the height
        position: 'fixed', // Stick the header to the top
        top: 0, // Ensure it touches the top of the viewport
        zIndex: 1000, // Keep it above other elements
        borderBottom: 'none', // Removed the border to eliminate the white line
    },
    logo: {
        height: '50px', // Adjust the logo height
        objectFit: 'contain', // Maintain aspect ratio
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px', // Space between buttons
    },
};

export default Header;