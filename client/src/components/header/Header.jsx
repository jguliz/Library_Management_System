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

    const guestItems = [
        { title: "My Books", link: "/" },
        { title: "Browse Books", link: "/" },
        { title: "Browse Devices", link: "/" }
    ];

    const handleLogout = () => {
        const token = localStorage.getItem("token");
        
        if (token) {
            try {
                // Call the logout endpoint on your server
                fetch("https://library-management-system-gf9d.onrender.com/logout", {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });
            } catch (error) {
                console.error("Error logging out:", error);
            }
        }
        
        localStorage.removeItem("token");
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
                                    <Link key={item.title} to={item.link} className="link">
                                        {item.title}
                                    </Link>
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