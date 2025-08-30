// promptvault-frontend/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios'; // npm install axios

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '' // For confirmation
    });

    const { username, email, password, password2 } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            
            console.log('Passwords do not match');
        } else {
            try {
                const res = await axios.post('http://localhost:5000/api/auth/register', {
                    username,
                    email,
                    password
                });
                console.log(res.data); // Should log the JWT token
                // Store token in localStorage or context API
            } catch (err) {
                console.error(err.response.data);
            }
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-full max-w-md">
                <h3 className="text-2xl font-bold text-center">Register</h3>
                <form className='p-5' onSubmit={onSubmit}>
                <div className='mt-4'>
                    <label className='block' htmlFor='name'>User Name</label>
                    <input className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='mt-4'>
                    <label className='block' htmlFor='email'> E-mail</label>
                    <input className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='mt-4'>
                    <label className='block' htmlFor='password'>Password</label>
                    <input className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        minLength="6"
                        required
                    />
                </div>
                <div className='mt-4'>
                    <label className='block' htmlFor='password'> Confirm Password</label>
                    <input className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={onChange}
                        minLength="6"
                        required
                    />
                </div>
                <button className='px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full' type='submit'> Register</button>
            </form>
            </div>
        </div>
    );
};

export default Register;