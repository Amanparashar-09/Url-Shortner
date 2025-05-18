import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import {useDispatch, useSelector} from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';
import '../styles/auth.css';
import GoogleLoginButton from './GoogleLoginButton';

const LoginForm = ({ state }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            const data = await loginUser(password, email);
            dispatch(login(data.user));
            navigate({to:"/dashboard"});
            setLoading(false);
            console.log("signin success");
        } catch (err) {
            setLoading(false);
            setError(err.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">Sign in to access your account</p>

                {error && (
                    <div className="error-message">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                <div className="input-group">
                    <label className="input-label" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        className="input-field"
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label className="input-label" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="input-field"
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    className="auth-button"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>

                <div className="divider">
                    <div className="divider-line"></div>
                    <span className="divider-text">Or continue with</span>
                    <div className="divider-line"></div>
                </div>

                <div className="social-login">
                    <GoogleLoginButton />
                </div>

                <div className="auth-footer">
                    <p>
                        Don't have an account? <span onClick={() => state(false)} className="auth-link">Create Account</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;