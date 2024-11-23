// src/pages/ProfilePage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();

    // Navigate to home page on click
    const handleBackToHomeClick = () => {
        navigate('/'); // Redirect to home page
    };

    return (
        <div style={styles.profilePage}>
            <h1>Profile Page</h1>
            {/* Profile details go here */}

            <span
                style={styles.backToHomeLink}
                onClick={handleBackToHomeClick}
            >
                Back to Home
            </span>
        </div>
    );
};

// Styling for ProfilePage component
const styles = {
    profilePage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    backToHomeLink: {
        fontSize: '1rem',
        color: '#007bff', // Blue color
        textDecoration: 'underline', // Underlined like a hyperlink
        cursor: 'pointer', // Pointer cursor to mimic a link
        marginTop: '20px', // Spacing from content
    },
};

export default ProfilePage;
