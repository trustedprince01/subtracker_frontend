import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post(`${API_URL}/password/reset/`, { email });
      setSubmitted(true);
    } catch (err) {
      setError('Could not send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-darkBlue-800 relative">
      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="bg-darkBlue-700 shadow-xl rounded-lg py-10 px-8 border border-purple-900 border-opacity-20 bg-opacity-70 backdrop-blur-lg">
          <div className="flex justify-center mb-6">
            <div className="text-xl font-bold text-purple-300 flex items-center">
              <img 
                src="/activity.png" 
                alt="SubTrackr Logo" 
                className="w-10 h-10 mr-2"
                style={{ display: 'inline-block', verticalAlign: 'middle' }}
              />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-400">
                SubTrackr
              </span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-100 mb-8">
            Forgot Password
          </h2>
          {submitted ? (
            <div className="text-center text-green-400 mb-6">
              If an account with that email exists, a password reset link has been sent.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="bg-darkBlue-800 bg-opacity-50 border-purple-900 border-opacity-30 pl-10 focus-visible:ring-purple-400 focus-visible:border-purple-400 text-gray-100"
                    required
                  />
                </div>
              </div>
              {error && <div className="text-red-400 text-sm text-center">{error}</div>}
              <Button type="submit" className="w-full hover-grow bg-purple-gradient button-glow hover:opacity-95 transition-all duration-300" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          )}
          <div className="text-center mt-6 text-gray-400">
            <Link to="/login" className="text-purple-300 hover:text-purple-400 hover:underline">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 