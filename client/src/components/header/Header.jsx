import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import "./Header.css";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const location = useLocation();
    
    useEffect(() => {
        // Check if user is logged in when component mounts
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
        
        // Check user role
        const storedRole = localStorage.getItem("userRole");
        if (storedRole) {
            setUserRole(parseInt(storedRole));
        }
    }, [location]);
    
    const handleLogout = async () => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                await fetch("https://library-management-system-gf9d.onrender.com/logout", {
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

        localStorage.clear();
        window.location.href = '/login';
    };
    
    // Navigation items based on user role
    const getNavItems = () => {
        // Base items for all users
        const items = [
            { title: "Browse Books", link: `/browsebooks` },
            { title: "Browse Devices", link: `/browsedevices` },
        ];
        
        // Items for logged in users
        if (isLoggedIn) {
            if (userRole === 1) {
                // Librarian-specific items
                return [
                    ...items,
                    { title: "Dashboard", link: `/librarian` },
                    { title: "Manage Books", link: `/librarian/manage-books` },
                    { title: "Manage Devices", link: `/librarian/manage-devices` },
                    { title: "User Management", link: `/librarian/users` },
                    { title: "Reports", link: `/librarian/reports` },
                ];
            } else {
                // Regular user items
                return [
                    ...items,
                    { title: "My Books", link: `/mybooks` },
                    { title: "Account", link: `/account` },
                ];
            }
        }
        
        return items;
    };
    
    const navItems = getNavItems();

    return (
        <header className="header">
            <div className="container">
                <nav className="nav">
                    <div className="logo">
                        <Link to="/">
                            <img src="/logo.png" alt="Cougar Public Library Logo" />
                        </Link>
                        <h1>Cougar Public Library</h1>
                    </div>

                    <div className="nav-links">
                        {navItems.map((item) => (
                            <Link 
                                key={item.title} 
                                to={item.link} 
                                className={`link ${location.pathname === item.link ? 'active' : ''}`}
                            >
                                {item.title}
                            </Link>
                        ))}
                        
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="btn btn-outline">
                                Logout
                            </button>
                        ) : (
                            <Link className="btn btn-primary" to="/login">
                                Login
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;