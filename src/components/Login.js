import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { invoke } from '@tauri-apps/api/tauri';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [accentColor, setAccentColor] = useState('#8b5cf6');
  const [systemUsername, setSystemUsername] = useState('User');
  const [saveLogin, setSaveLogin] = useState(false);

  useEffect(() => {
    // Load accent color
    const savedColor = localStorage.getItem('accentColor');
    if (savedColor) {
      setAccentColor(savedColor);
    }

    // Load saved login if exists
    const savedLogin = localStorage.getItem('savedLogin');
    if (savedLogin) {
      const loginData = JSON.parse(savedLogin);
      setFormData(loginData);
      setSaveLogin(true);
    }

    // Get system username
    const getSystemUsername = async () => {
      try {
        const username = await invoke('get_system_username');
        setSystemUsername(username);
        if (!formData.username) {
          setFormData(prev => ({ ...prev, username }));
        }
      } catch (error) {
        console.error('Failed to get system username:', error);
      }
    };

    getSystemUsername();
  }, []);

  const validateCredentials = async (username, password) => {
    // GitHub API simulation for user validation
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.ok) {
        // For demo purposes, accept any password for existing GitHub users
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login validation
        if (!formData.username || !formData.password) {
          setError('Please fill in all required fields');
          return;
        }

        const isValid = await validateCredentials(formData.username, formData.password);
        if (!isValid) {
          setError('Invalid username or password. Please check your credentials.');
          return;
        }

        const userData = {
          id: Date.now(),
          username: formData.username,
          email: formData.email || `${formData.username}@github.com`,
          loginTime: new Date().toISOString(),
          type: 'registered'
        };

        if (saveLogin) {
          localStorage.setItem('savedLogin', JSON.stringify({
            username: formData.username,
            password: formData.password,
            email: formData.email
          }));
        }

        onLogin(userData);
      } else {
        // Register validation
        if (!formData.username || !formData.email || !formData.password) {
          setError('Please fill in all required fields');
          return;
        }

        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters long');
          return;
        }

        // Check if user already exists
        const userExists = await validateCredentials(formData.username, '');
        if (userExists) {
          setError('Username already exists. Please choose a different one.');
          return;
        }

        const userData = {
          id: Date.now(),
          username: formData.username,
          email: formData.email,
          loginTime: new Date().toISOString(),
          type: 'registered'
        };

        if (saveLogin) {
          localStorage.setItem('savedLogin', JSON.stringify({
            username: formData.username,
            password: formData.password,
            email: formData.email
          }));
        }

        onLogin(userData);
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    const guestData = {
      id: `guest-${Date.now()}`,
      username: systemUsername,
      email: `${systemUsername}@guest.local`,
      type: 'guest',
      loginTime: new Date().toISOString()
    };
    onLogin(guestData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        zIndex: 1000,
        overflow: 'hidden'
      }}
    >
      {/* Animated Background */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `${300 + i * 100}px`,
            height: `${300 + i * 100}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor}${Math.floor(20 - i * 2).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
            filter: 'blur(60px)',
            pointerEvents: 'none'
          }}
          animate={{
            x: ['-50%', '50%', '-50%'],
            y: ['-50%', '50%', '-50%'],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: i * 0.5
          }}
        />
      ))}

      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '40px',
          borderRadius: '24px',
          boxShadow: `0 0 60px ${accentColor}33`,
          border: `1px solid ${accentColor}44`,
          width: '100%',
          maxWidth: '420px',
          position: 'relative',
          overflow: 'hidden',
          backdropFilter: 'blur(20px)'
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ textAlign: 'center', marginBottom: '32px' }}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            style={{
              width: '60px',
              height: '60px',
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}aa)`,
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              boxShadow: `0 8px 32px ${accentColor}66`
            }}
          >
            TFY
          </motion.div>
          <h1 style={{ 
            fontSize: '28px', 
            marginBottom: '8px',
            color: '#fff',
            fontWeight: '700'
          }}>
            {isLogin ? 'Welcome Back!' : 'Join TFY Tool'}
          </h1>
          <p style={{ 
            fontSize: '16px', 
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            {isLogin ? 'Sign in to continue' : 'Create your account'}
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {/* Username */}
              <div style={{ position: 'relative' }}>
                <FiUser 
                  size={18} 
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: accentColor,
                    zIndex: 1
                  }}
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '16px 16px 16px 48px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${formData.username ? accentColor : 'rgba(255, 255, 255, 0.2)'}`,
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              {/* Email (Register only) */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ position: 'relative' }}
                >
                  <FiMail 
                    size={18} 
                    style={{
                      position: 'absolute',
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: accentColor,
                      zIndex: 1
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '16px 16px 16px 48px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${formData.email ? accentColor : 'rgba(255, 255, 255, 0.2)'}`,
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
                    }}
                    required={!isLogin}
                  />
                </motion.div>
              )}

              {/* Password */}
              <div style={{ position: 'relative' }}>
                <FiLock 
                  size={18} 
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: accentColor,
                    zIndex: 1
                  }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '16px 48px 16px 48px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${formData.password ? accentColor : 'rgba(255, 255, 255, 0.2)'}`,
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: accentColor,
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              {/* Save Login Checkbox */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '8px'
              }}>
                <input
                  type="checkbox"
                  id="saveLogin"
                  checked={saveLogin}
                  onChange={(e) => setSaveLogin(e.target.checked)}
                  style={{
                    width: '16px',
                    height: '16px',
                    accentColor: accentColor
                  }}
                />
                <label htmlFor="saveLogin" style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  Save login credentials
                </label>
              </div>
            </motion.div>
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                color: '#ef4444',
                fontSize: '14px',
                textAlign: 'center',
                marginTop: '16px',
                padding: '8px',
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            style={{
              width: '100%',
              padding: '16px',
              background: loading ? 'rgba(139, 92, 246, 0.5)' : accentColor,
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: loading ? 'none' : `0 8px 32px ${accentColor}66`,
              transition: 'all 0.2s'
            }}
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid transparent',
                    borderTop: '2px solid white',
                    borderRadius: '50%'
                  }}
                />
                Processing...
              </>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </motion.button>
        </form>

        {/* Toggle & Guest Login */}
        <div style={{ textAlign: 'center' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: 'none',
              border: 'none',
              color: accentColor,
              fontSize: '14px',
              cursor: 'pointer',
              marginBottom: '16px',
              textDecoration: 'underline'
            }}
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </motion.button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.2)' }} />
            <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.2)' }} />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGuestLogin}
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
          >
            <FiUser size={16} />
            Continue as Guest ({systemUsername})
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;