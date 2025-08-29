// src/components/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); // Hook for navigation

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        await login(formData.email, formData.password);
        navigate('/dashboard'); // Redirect to dashboard on successful login
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-full max-w-md">
                <h3 className="text-2xl font-bold text-center">Login to your account</h3>
                <form onSubmit={onSubmit}>
                    {/* ... form inputs are the same as before ... */}
                    <div className="mt-4">
                        <label className="block" htmlFor="email">Email</label>
                        <input type="email" placeholder="Email" name="email" value={formData.email} onChange={onChange} required className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                    </div>
                    <div className="mt-4">
                        <label className="block">Password</label>
                        <input type="password" placeholder="Password" name="password" value={formData.password} onChange={onChange} required className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                    </div>
                    <div className="flex items-baseline justify-between">
                        <button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;