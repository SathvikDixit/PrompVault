// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const AuthContext = createContext(null);

// Create the provider component
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null); // Optional: store user details
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    // Function to set auth token in headers for all axios requests
    const setAuthToken = token => {
        if (token) {
            axios.defaults.headers.common['x-auth-token'] = token;
        } else {
            delete axios.defaults.headers.common['x-auth-token'];
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
            setAuthToken(storedToken);
        }
    }, []);

    const login = async (email, password) => {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const body = JSON.stringify({ email, password });
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', body, config);
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            setIsAuthenticated(true);
            setAuthToken(res.data.token);
            // You can also fetch and set user data here
        } catch (err) {
            console.error(err.response.data);
            // Handle login error
        }
    };

    const register = async ({ username, email, password }) => {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const body = JSON.stringify({ username, email, password });
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', body, config);
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            setIsAuthenticated(true);
            setAuthToken(res.data.token);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};