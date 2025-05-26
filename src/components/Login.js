import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ThemeContext';
import { FiGithub } from 'react-icons/fi';

const Login = ({ onLogin }) => {
  const { theme, primaryColor } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubLogin = async () => {
    try {
      setIsLoading(true);
      const result = await window.electron.runFunction('github-auth');
      if (result.success) {
        onLogin(result.user);
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
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

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGithubLogin}
          disabled={isLoading}
          style={{
            width: '100%',
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
      </motion.div>
    </motion.div>
  );
};

export default Login;