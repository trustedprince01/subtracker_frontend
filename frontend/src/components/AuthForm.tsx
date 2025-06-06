import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, User, Mail, Shield } from 'lucide-react';
import axios from 'axios';
import { setAccessToken, setRefreshToken } from '@/lib/auth';

interface AuthFormProps {
  type: 'login' | 'signup';
}

const API_URL = import.meta.env.VITE_API_URL;

const handleSignup = async (email: string, password: string, userData: any) => {
  try {
    const response = await axios.post(`${API_URL}/api/register/`, {
      email,
      password,
      first_name: userData.firstName,
      last_name: userData.lastName,
      username: userData.username
    });
    
    // Return success without logging in
    return { 
      data: { success: true }, 
      error: null 
    };
  } catch (error: any) {
    console.error('Signup error:', error);
    let errorMessage = 'Signup failed. Please try again.';
    
    // Handle specific error cases
    if (error.response?.data) {
      const errorData = error.response.data;
      
      // Handle field-specific errors
      if (errorData.email) {
        errorMessage = Array.isArray(errorData.email) 
          ? errorData.email[0] 
          : 'This email is already in use. Please use a different email.';
      } else if (errorData.username) {
        errorMessage = Array.isArray(errorData.username)
          ? errorData.username[0]
          : 'This username is already taken. Please choose a different one.';
      } else if (errorData.non_field_errors) {
        errorMessage = Array.isArray(errorData.non_field_errors)
          ? errorData.non_field_errors[0]
          : 'Signup failed. Please check your information and try again.';
      } else if (typeof errorData === 'string') {
        errorMessage = errorData;
      }
    }
    
    return { 
      data: null, 
      error: { message: errorMessage }
    };
  }
};

const handleLogin = async (email: string, password: string) => {
  try {
    // Note: The backend expects 'username' but we'll send email as the username
    const response = await axios.post(`${API_URL}/api/login/`, {
      username: email,  // Using email as username
      password,
    });
    
    if (!response.data.access) {
      throw new Error('No access token received');
    }
    
    // Get user profile first
    const userResponse = await axios.get(`${API_URL}/api/user/profile/`, {
      headers: {
        'Authorization': `Bearer ${response.data.access}`
      }
    });

    return { 
      data: { 
        user: userResponse.data,
        session: { 
          access_token: response.data.access,
          refresh_token: response.data.refresh 
        }
      }, 
      error: null 
    };
  } catch (error: any) {
    console.error('Login error:', error);
    
    // Handle specific error cases
    let errorMessage = 'Login failed. Please check your credentials.';
    
    if (error.response?.data) {
      const errorData = error.response.data;
      
      if (errorData.detail) {
        errorMessage = errorData.detail;
      } else if (errorData.non_field_errors) {
        errorMessage = Array.isArray(errorData.non_field_errors)
          ? errorData.non_field_errors[0]
          : 'Invalid credentials';
      } else if (typeof errorData === 'string') {
        errorMessage = errorData;
      }
    }
    
    return { 
      data: null, 
      error: { message: errorMessage }
    };
  }
};

const AuthForm = ({ type }: AuthFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  
  const isLogin = type === 'login';
  const title = isLogin ? 'Welcome Back' : 'Create Your Account';
  const buttonText = isLogin ? 'Login' : 'Sign Up';
  const toggleText = isLogin 
    ? "Don't have an account? " 
    : "Already have an account? ";
  const toggleLink = isLogin ? '/signup' : '/login';
  const toggleLinkText = isLogin ? 'Sign up here' : 'Log in here';
  
  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return 0;
    
    let strength = 0;
    
    // Length
    if (pass.length >= 8) strength += 1;
    
    // Contains lowercase
    if (/[a-z]/.test(pass)) strength += 1;
    
    // Contains uppercase
    if (/[A-Z]/.test(pass)) strength += 1;
    
    // Contains number
    if (/[0-9]/.test(pass)) strength += 1;
    
    // Contains special char
    if (/[^a-zA-Z0-9]/.test(pass)) strength += 1;
    
    setPasswordStrength(strength);
    return strength;
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    calculatePasswordStrength(newPassword);
  };
  
  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
      case 3:
        return 'bg-yellow-500';
      case 4:
      case 5:
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };
  
  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'Weak';
      case 2:
      case 3:
        return 'Medium';
      case 4:
      case 5:
        return 'Strong';
      default:
        return '';
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!email || !password || (!isLogin && (!firstName || !lastName || !username))) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (!isLogin) {
      if (password !== confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match.",
          variant: "destructive",
        });
        return;
      }
      
      if (passwordStrength < 3) {
        toast({
          title: "Weak Password",
          description: "Please choose a stronger password for better security.",
          variant: "destructive",
        });
        return;
      }

      try {
        // Call the Supabase signup
        const { data, error } = await handleSignup(email, password, {
          firstName,
          lastName,
          username
        });
        
        if (error) {
          console.error('Signup error:', error);
          throw error;
        }
        
        if (data?.success) {
          toast({
            title: "Account created!",
            description: "Please log in with your credentials.",
          });
          
          // Redirect to login page after successful signup
          window.location.href = '/login';
        } else {
          throw new Error('Registration failed');
        }
      } catch (error: any) {
        console.error('Signup error details:', error);
        let errorMessage = 'Failed to create account. Please try again.';
        
        // Use the error message from the API if available
        if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.message) {
          // Something happened in setting up the request
          errorMessage = error.message;
        }
        
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } else {
      try {
        // Call the login function
        const { data, error } = await handleLogin(email, password);
        
        if (error) {
          console.error('Login error:', error);
          throw error;
        }
        
        if (data?.user) {
          // Store the tokens
          setAccessToken(data.session.access_token);
          if (data.session.refresh_token) {
            setRefreshToken(data.session.refresh_token);
          }
          
          // Show success message
          toast({
            title: "Welcome back!",
            description: `Logged in as ${data.user.email || email}`,
          });
          
          // Redirect to dashboard after successful login
          navigate('/dashboard');
        } else {
          throw new Error('No user data received');
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-darkBlue-800 relative">
      {/* Particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              animationDuration: `${Math.random() * 20 + 10}s`
            }}
          />
        ))}
      </div>
      
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
            {title}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email and Username side by side for signup, only Email for login */}
            {isLogin ? (
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
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-darkBlue-800 bg-opacity-50 border-purple-900 border-opacity-30 pl-10 focus-visible:ring-purple-400 focus-visible:border-purple-400 text-gray-100"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-darkBlue-800 bg-opacity-50 border-purple-900 border-opacity-30 pl-10 focus-visible:ring-purple-400 focus-visible:border-purple-400 text-gray-100"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-200">Username</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                      <User size={18} /> 
                    </div>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      className="bg-darkBlue-800 bg-opacity-50 border-purple-900 border-opacity-30 pl-10 focus-visible:ring-purple-400 focus-visible:border-purple-400 text-gray-100"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* First Name and Last Name side by side for signup only */}
            {!isLogin && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-200">First Name</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                      <User size={18} />
                    </div>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      className="bg-darkBlue-800 bg-opacity-50 border-purple-900 border-opacity-30 pl-10 focus-visible:ring-purple-400 focus-visible:border-purple-400 text-gray-100"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-200">Last Name</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                      <User size={18} />
                    </div>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      className="bg-darkBlue-800 bg-opacity-50 border-purple-900 border-opacity-30 pl-10 focus-visible:ring-purple-400 focus-visible:border-purple-400 text-gray-100"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                  <Shield size={18} />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  className="bg-darkBlue-800 bg-opacity-50 border-purple-900 border-opacity-30 pl-10 pr-10 focus-visible:ring-purple-400 focus-visible:border-purple-400 text-gray-100"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-purple-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {!isLogin && password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`} 
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">
                    Password strength: <span className={`font-medium ${
                      passwordStrength <= 1 ? 'text-red-400' : 
                      passwordStrength <= 3 ? 'text-yellow-400' : 'text-green-400'
                    }`}>{getPasswordStrengthText()}</span>
                  </p>
                </div>
              )}
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-200">Confirm Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                    <Shield size={18} />
                  </div>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-darkBlue-800 bg-opacity-50 border-purple-900 border-opacity-30 pl-10 pr-10 focus-visible:ring-purple-400 focus-visible:border-purple-400 text-gray-100"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-purple-300"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
                )}
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox id="remember" className="border-purple-900 border-opacity-60 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500" />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-purple-300 hover:text-purple-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full hover-grow bg-purple-gradient button-glow hover:opacity-95 transition-all duration-300"
            >
              {buttonText}
            </Button>
            
            {!isLogin && (
              <div className="text-xs text-gray-400 text-center">
                By signing up, you agree to our <Link to="/terms" className="text-purple-300 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-purple-300 hover:underline">Privacy Policy</Link>
              </div>
            )}
          </form>
          
          <div className="relative mt-8 mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-darkBlue-700 text-gray-400">Or continue with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="bg-transparent border-gray-600 hover:bg-gray-700 text-gray-300">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path 
                  fill="currentColor" 
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" 
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="bg-transparent border-gray-600 hover:bg-gray-700 text-gray-300">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path 
                  fill="currentColor" 
                  d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" 
                />
              </svg>
              Apple
            </Button>
          </div>

          <div className="text-center mt-6 text-gray-400">
            {toggleText}
            <Link to={toggleLink} className="text-purple-300 hover:text-purple-400 hover:underline">
              {toggleLinkText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
function setUser(user: any) {
  throw new Error('Function not implemented.');
}

