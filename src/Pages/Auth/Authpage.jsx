import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLock, FiMail, FiUser, FiArrowRight, FiGithub, FiTwitter, FiFacebook } from 'react-icons/fi';
import TechImage from '../../Assets/auth.png';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        navigate('/');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding & Illustration */}
            <div className="hidden lg:block w-1/2 bg-gradient-to-br from-indigo-600 to-indigo-800 relative">
                <div className="p-12">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-white flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <span className="bg-white text-indigo-600 px-3 py-1 rounded-lg mr-2">RT</span>
                        Raqmi Tech
                    </Link>
                </div>

                <div className="absolute inset-0 flex items-center justify-center ">
                    <img
                        src={TechImage}
                        alt="Tech Illustration"
                        className="w-full max-w-md"
                    />
                    <div className="absolute bottom-12 left-12 text-white">
                        <h2 className="text-4xl font-bold mb-4">Welcome to Raqmi Tech</h2>
                        <p className="text-lg opacity-90">
                            {isLogin ? 'Login to access your tech universe' : 'Join the tech revolution'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    <div className="lg:hidden mb-8 text-center">
                        <Link 
                            to="/" 
                            className="text-2xl font-bold text-indigo-600 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg mr-2">RT</span>
                            Raqmi Tech
                        </Link>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {isLogin ? 'Welcome Back!' : 'Create Account'}
                    </h1>
                    <p className="text-gray-500 mb-8">
                        {isLogin ? 'Sign in to continue to your dashboard' : 'Start your tech journey with us'}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                            <div className="relative">
                                <FiUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <div className="relative">
                            <FiMail className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg  "
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="relative">
                            <FiLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg "
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {!isLogin && (
                            <div className="flex items-center text-sm text-gray-500">
                                <input type="checkbox" id="terms" className="mr-2" required />
                                <label htmlFor="terms">
                                    I agree to Raqmi Tech's{' '}
                                    <Link to="/terms" className="text-indigo-600 hover:underline">
                                        Terms of Service
                                    </Link>
                                </label>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                            <FiArrowRight className="ml-2" />
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-indigo-600 hover:underline"
                        >
                            {isLogin ?
                                "Don't have an account? Sign Up" :
                                "Already have an account? Sign In"
                            }
                        </button>
                    </div>

                    <div className="my-8 flex items-center">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-4 text-gray-500 text-sm">Or continue with</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    <div className="flex space-x-4 justify-center">
                        <button className="flex items-center justify-center w-12 h-12 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                            <FiGithub className="text-gray-600" />
                        </button>
                        <button className="flex items-center justify-center w-12 h-12 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                            <FiTwitter className="text-blue-400" />
                        </button>
                        <button className="flex items-center justify-center w-12 h-12 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                            <FiFacebook className="text-blue-600" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;