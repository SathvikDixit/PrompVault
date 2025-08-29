// src/App.js (The Corrected and Final Version)
import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate
} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from './context/AuthContext';

// It's good practice to define the Header inside the file that uses it
// OR ensure it's imported correctly and used within the Router's context.
const Header = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow">
            <nav className="container mx-auto p-4 flex justify-between items-center">
                {/* This Link will only work because Header is inside Router */}
                <Link to="/" className="text-xl font-bold">PromptVault</Link>
                <div>
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Logout
                        </button>
                    ) : (
                        <div className="space-x-4">
                            <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                            <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};


function App() {
  // We need to check authentication status to handle the root route '/'
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            
            {/* 
              This is a better way to handle the root path.
              If the app loads at '/', it will redirect.
            */}
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// NOTE: App component uses useContext, so it must be a child of AuthProvider.
// We already ensured this in index.js, which is correct.
export default App;