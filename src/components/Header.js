import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <header className="animated-header">
            <img
                src="/logo512.png"
                alt="BistroMoods Logo"
                className="header-logo"
            />
            <div className="header-actions">
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

export default Header;