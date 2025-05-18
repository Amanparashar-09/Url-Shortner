import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/authSlice';
import { logoutUser } from '../api/user.api';
import { useNavigate } from '@tanstack/react-router';
import '../styles/navbar.css';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      const response = await logoutUser();
      console.log('Logout response:', response);

      // Clear auth state in Redux
      dispatch(logout());

      // Redirect to login page
      navigate({ to: '/' });
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="navbar-logo">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="url(#gradient)">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span className="logo-text">URL Shortener</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="navbar-links">
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="navbar-link">Dashboard</Link>
            </>
          )}
        </div>

        {/* User Section */}
        <div className="navbar-user">
          {isAuthenticated ? (
            <>
              <span className="user-greeting">Welcome, {user?.name || 'User'}</span>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <Link to="/" className="login-button">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {isAuthenticated && (
          <>
            <Link to="/dashboard" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
          </>
        )}
        {isAuthenticated ? (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        ) : (
          <Link to="/" className="login-button" onClick={() => setMobileMenuOpen(false)}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;