// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [prompts, setPrompts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    // Function to fetch prompts
    const fetchPrompts = async () => {
        const token = localStorage.getItem('token'); // Get token from storage
        if (token) {
            try {
                // Set the token in the headers for authenticated requests
                const config = {
                    headers: {
                        'x-auth-token': token
                    }
                };
                const res = await axios.get('http://localhost:5000/api/prompts', config);
                setPrompts(res.data);
            } catch (err) {
                console.error('Error fetching prompts:', err);
                // Handle error, e.g., token expired, log user out
            }
        }
    };

    // useEffect hook runs once when the component mounts
    useEffect(() => {
        fetchPrompts();
    }, []);

    // Handle form submission to add a new prompt
    const onAddPrompt = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        };
        const body = JSON.stringify({ title, content, tags });

        try {
            await axios.post('http://localhost:5000/api/prompts', body, config);
            // Clear form and refetch prompts to show the new one
            setTitle('');
            setContent('');
            setTags('');
            fetchPrompts();
        } catch (err) {
            console.error('Error adding prompt:', err.response.data);
        }
    };

    return (
        <div className="container mx-auto p-4 grid md:grid-cols-3 gap-8">
            {/* Column 1: Add New Prompt Form */}
            <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Add New Prompt</h2>
                <form onSubmit={onAddPrompt}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Prompt Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Tags (comma-separated)</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                        Add Prompt
                    </button>
                </form>
            </div>

            {/* Column 2: Display Prompts */}
            <div className="md:col-span-2">
                <h2 className="text-3xl font-bold mb-4">My Personal Prompts</h2>
                <div className="space-y-4">
                    {prompts.length > 0 ? (
                        prompts.map(prompt => (
                            <div key={prompt._id} className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-bold text-xl">{prompt.title}</h3>
                                <p className="text-gray-600 my-2">{prompt.content}</p>
                                <div className="flex space-x-2">
                                    {prompt.tags.map(tag => (
                                        <span key={tag} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>You have no prompts yet. Add one to get started!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;