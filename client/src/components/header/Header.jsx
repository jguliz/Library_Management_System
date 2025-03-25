import "./Header.css";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in when component mounts
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Convert to boolean
    }, []);

    const items = [
        { title: "My Books", link: `/mybooks` },
        { title: "Browse Books", link: `/browsebooks` },
        { title: "Browse Devices", link: `/browsedevices` },
        { title: "Account", link: `/account` }  
    ];

    const guestItems = ["My Books", "Browse Books", "Browse Devices"];

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        window.location.href = "/login";
    };

    return (
        <header className="header">
            <div className="container">
                <nav className="nav">
                    <div className="logo">
                        <Link to="/">
                            <img src="/logo.png" alt="Logo" />
                        </Link>
                        <h1>Cougar Public Library</h1>
                    </div>

                    <div className="nav-links">
                        {isLoggedIn ? (
                            <>
                                {items.map((item) => (
                                    <Link key={item.title} to={item.link} className="link">
                                        {item.title}
                                    </Link>
                                ))}
                                <button
                                    className="logout_button"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                {guestItems.map((item) => (
                                    <a key={item} href="/" className="link">
                                        {item}
                                    </a>
                                ))}
                                <Link className="button" to="/login">Log in</Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;