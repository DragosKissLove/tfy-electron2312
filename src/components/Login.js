import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ThemeContext';
import { FiGithub, FiUser } from 'react-icons/fi';

const Login = ({ onLogin }) => {
  const { theme, primaryColor } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubLogin = async () => {
    try {
      setIsLoading(true);
      // GitHub login functionality will be implemented later
      console.log('GitHub login not implemented yet');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    const guestData = {
      id: `guest-${Date.now()}`,
      name: 'Guest User',
      type: 'guest',
      loginTime: new Date().toISOString()
    };
    
    // Store guest session in localStorage
    localStorage.setItem('guestSession', JSON.stringify(guestData));
    
    onLogin(guestData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.background,
        zIndex: 1000
      }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          background: theme.cardBg,
          padding: '40px',
          borderRadius: '20px',
          boxShadow: `0 0 30px ${primaryColor}33`,
          border: `1px solid ${theme.border}`,
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center'
        }}
      >
        <motion.h1
          style={{
            fontSize: '24px',
            marginBottom: '30px',
            background: `linear-gradient(45deg, ${theme.text}, ${primaryColor})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Welcome to TFY Tool
        </motion.h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGithubLogin}
            disabled={isLoading}
            style={{
              padding: '12px',
              background: theme.glass,
              border: `1px solid ${theme.border}`,
              borderRadius: '12px',
              color: theme.text,
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <FiGithub size={20} />
            {isLoading ? 'Connecting...' : 'Continue with GitHub'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGuestLogin}
            style={{
              padding: '12px',
              background: 'transparent',
              border: `1px solid ${theme.border}`,
              borderRadius: '12px',
              color: theme.text,
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <FiUser size={20} />
            Continue as Guest
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;