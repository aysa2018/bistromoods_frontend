// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, username }) => {
    const navigate = useNavigate();

    return (
        <header style={styles.header}>
            <h1>{title}</h1>
            {/* Make the username clickable to redirect to the profile page */}
            <div
                style={styles.username}
                onClick={() => navigate('/profile')}
                title="Go to your profile"
            >
                {username}
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
        backgroundColor: '#f8f8f8',
        borderBottom: '1px solid #ddd',
    },
    username: {
        cursor: 'pointer',
        color: '#007bff',
        textDecoration: 'underline',
    },
};

export default Header;
