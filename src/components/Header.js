// src/components/Header.js
import React from 'react';

const Header = ({ username }) => {
    return (
        <div style={styles.header}>
            <div style={styles.leftPlaceholder}></div>
            <h1 style={styles.title}>BistroMoods</h1>
            <div style={styles.profile}>
                <img 
                    src="https://via.placeholder.com/40" 
                    alt="Profile" 
                    style={styles.profilePic} 
                />
                <span>{username}</span>
            </div>
        </div>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: '10px 20px',
        color: '#fff',
        width: '100vw',           // Full viewport width
        boxSizing: 'border-box',   // Ensures padding doesn’t affect the width
    },
    leftPlaceholder: {
        width: '40px',             // Placeholder to balance the layout
    },
    title: {
        fontSize: '24px',
        color: '#fff',
        textAlign: 'center',
        flex: '1',
        margin: 0,
    },
    profile: {
        display: 'flex',
        alignItems: 'center',
    },
    profilePic: {
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        marginRight: '10px',
        border: '2px solid #fff',
    },
};

export default Header;
