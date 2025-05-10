import React from 'react';
import AuthForm from '@/components/AuthForm';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="relative">
      <div className="absolute top-6 left-6 z-20">
        <Link 
          to="/" 
          className="flex items-center text-purple-300 hover:text-purple-400 transition-colors"
        >
          <img 
            src="/activity.png" 
            alt="SubTrackr Logo" 
            className="w-6 h-6 mr-2"
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
          />
          Back to home
        </Link>
      </div>
      <AuthForm type="login" />
    </div>
  );
};

export default Login;