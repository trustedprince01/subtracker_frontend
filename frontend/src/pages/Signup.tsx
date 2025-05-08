
import React from 'react';
import AuthForm from '@/components/AuthForm';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="relative">
      <div className="absolute top-6 left-6 z-20">
        <Link 
          to="/" 
          className="flex items-center text-purple-300 hover:text-purple-400 transition-colors"
        >
          <svg 
            className="w-6 h-6 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back to home
        </Link>
      </div>
      <AuthForm type="signup" />
    </div>
  );
};

export default Signup;
