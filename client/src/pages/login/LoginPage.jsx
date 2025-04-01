import React, { useState } from "react";
import axios from 'axios';
import './LoginPage.css';

const Login = () => {
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // triggered when user submits the login form
    const handleSubmit = async(event) => {
        event.preventDefault(); // prevents the page from refreshing
        setIsLoading(true);
        setMessage('');

        const data = {
            userID,
            password
        };

        console.log("Attempting login with:", data);

        try {
            const res = await axios.post('https://library-management-system-gf9d.onrender.com/login', data);
            console.log("Login response:", res.data);

            // if token received and USER role
            if (res.data.token && res.data.role === 2) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userRole", res.data.role);
                localStorage.setItem("userName", res.data.user);
                
                // Show success message
                setMessage({ type: 'success', text: res.data.message });
                
                // Redirect after a short delay
                setTimeout(() => {
                    window.location.href = `/account`;
                }, 1000);
            }

            // if token received and LIBRARIAN role
            else if (res.data.token && res.data.role === 1) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userRole", res.data.role);
                localStorage.setItem("userName", res.data.user);
                
                // Show success message
                setMessage({ type: 'success', text: res.data.message });
                
                // Redirect after a short delay
                setTimeout(() => {
                    window.location.href = `/librarian`;
                }, 1000);
            } else {
                // Handle unexpected response format
                setMessage({ type: 'error', text: 'Received unexpected response from server' });
                console.error('Unexpected response:', res.data);
            }

        } catch (error) {
            console.error("Login error:", error);

            if (error.response && error.response.data && error.response.data.message) {
                setMessage({ type: 'error', text: error.response.data.message });
            } else {
                setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <img src="/logo.png" alt="Cougar Public Library Logo" className="login-logo" />
                    <h1>Welcome to Cougar Public Library</h1>
                    <p>Please sign in to access your account</p>
                </div>
                
                <form id="login_form" className="login-form" onSubmit={handleSubmit}>
                    {message && (
                        <div className={`login-message ${message.type}`}>
                            {message.text}
                        </div>
                    )}
                    
                    <div className="form-group">
                        <label htmlFor="userId" className="form-label">User ID</label>
                        <div className="input-with-icon">
                            <span className="input-icon">👤</span>
                            <input 
                                id="userId"
                                type="text" 
                                className="form-input"
                                placeholder="Enter Your 7-digit ID"
                                value={userID} 
                                minLength={7}
                                maxLength={7}
                                onChange={(e) => setUserID(e.target.value)}
                                required
                            />
                        </div>
                        <p className="input-hint">Student: 7######, Alumni: 8######, Faculty: 9######, Librarian: 5######</p>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-with-icon">
                            <span className="input-icon">🔒</span>
                            <input 
                                id="password"
                                type="password" 
                                className="form-input"
                                placeholder="Enter Your Password"
                                value={password}
                                minLength={7}
                                maxLength={20}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;