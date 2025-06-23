import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const { login, signup, isLoading, error, clearError, user } = useAuth();
  const navigate = useNavigate();

  // Redirect to home page when user is authenticated
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      if (isSignup) {
        await signup({
          email: formData.email,
          password: formData.password,
          name: formData.name
        });
        
        // Show success message and switch to sign-in mode
        setShowSuccessMessage(true);
        setFormData({ email: formData.email, password: '', name: '' }); // Keep email, clear password
        
        // After 2 seconds, switch to sign-in mode
        setTimeout(() => {
          setShowSuccessMessage(false);
          setIsSignup(false);
        }, 2000);
        
      } else {
        await login({
          email: formData.email,
          password: formData.password
        });
        // Navigation will happen automatically via useEffect when user state changes
      }
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setFormData({ email: '', password: '', name: '' });
    setShowSuccessMessage(false);
    clearError();
  };

  return (
    <div className="space-bg min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Celestial Objects */}
      <div className="celestial-object planet w-24 h-24 top-1/4 left-1/4 animate-orbit opacity-30" />
      <div className="celestial-object planet w-16 h-16 bottom-1/4 right-1/4 animate-orbit-reverse opacity-20" />
      <div className="celestial-object w-2 h-2 bg-purple-300 top-1/3 right-1/3 animate-twinkle" />
      <div className="celestial-object w-2 h-2 bg-pink-300 bottom-1/3 left-1/3 animate-twinkle" />
      <div className="celestial-object w-3 h-3 bg-blue-300 top-2/3 left-2/3 animate-twinkle" />
      
      {/* Asteroid Belt */}
      <div className="absolute w-full h-full pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="celestial-object bg-gray-400/20 animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-md w-full mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-200 animate-glow tracking-tight tan-mon-cheri-display">
            Be
          </h1>
          <p className="text-xl text-purple-200 font-body font-light elegant-italic tracking-wide tan-mon-cheri-light">
            Your journey to inner peace begins here
          </p>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccessMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-display font-semibold text-green-300 mb-2 tan-mon-cheri-heading">
                Account Created Successfully!
              </h3>
              <p className="text-green-400/80 font-body tan-mon-cheri-body">
                Welcome to your wellness journey. Please sign in to continue.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auth Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-[0_0_50px_rgba(167,139,250,0.2)] border border-white/10"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-display font-semibold text-purple-200 mb-2 tan-mon-cheri-heading">
              {isSignup ? 'Create Your Account' : 'Welcome Back'}
            </h2>
            <p className="text-purple-300/80 font-body tan-mon-cheri-body">
              {isSignup ? 'Start your wellness journey today' : 'Continue your path to mindfulness'}
            </p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center space-x-2"
              >
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-red-300 text-sm font-body tan-mon-cheri-body">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Signup only) */}
            <AnimatePresence>
              {isSignup && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative"
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-purple-300/50" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-purple-200 placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent font-body tan-mon-cheri-body"
                    required={isSignup}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-purple-300/50" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-purple-200 placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent font-body tan-mon-cheri-body"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-purple-300/50" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-purple-200 placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent font-body tan-mon-cheri-body"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-purple-300/50 hover:text-purple-300" />
                ) : (
                  <Eye className="h-5 w-5 text-purple-300/50 hover:text-purple-300" />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading || showSuccessMessage}
              className="w-full px-6 py-3 text-lg font-display font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(167,139,250,0.5)] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed tracking-wide tan-mon-cheri-heading"
              whileHover={{ scale: (isLoading || showSuccessMessage) ? 1 : 1.02 }}
              whileTap={{ scale: (isLoading || showSuccessMessage) ? 1 : 0.98 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>{isSignup ? 'Creating Account...' : 'Signing In...'}</span>
                </div>
              ) : showSuccessMessage ? (
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Redirecting to Sign In...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>{isSignup ? 'Create Account' : 'Sign In'}</span>
                </div>
              )}
            </motion.button>
          </form>

          {/* Toggle Mode */}
          {!showSuccessMessage && (
            <div className="mt-6 text-center">
              <p className="text-purple-300/80 font-body tan-mon-cheri-body">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}
                <button
                  onClick={toggleMode}
                  className="ml-2 text-purple-200 hover:text-purple-100 font-medium underline transition-colors"
                  disabled={isLoading}
                >
                  {isSignup ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <p className="text-purple-300/60 text-sm text-center font-body elegant-italic tracking-wide tan-mon-cheri-light">
          Begin your journey to mindfulness and inner peace
        </p>
      </div>
    </div>
  );
};

export default Login;