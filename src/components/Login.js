import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ThemeContext';
import { FiUser } from 'react-icons/fi';

const Login = ({ onLogin }) => {
  const { theme, primaryColor } = useTheme();
  const [username, setUsername] = useState('User');

  useEffect(() => {
    if (window.electron) {
      window.electron.runFunction('get-username')
        .then(name => setUsername(name || 'User'))
        .catch(() => setUsername('User'));
    }
  }, []);

  const handleGuestLogin = () => {
    const guestData = {
      id: `guest-${Date.now()}`,
      name: username,
      type: 'guest',
      loginTime: new Date().toISOString()
    };
    
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
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%'],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '20px',
            padding: '1px',
            background: `linear-gradient(90deg, 
              ${primaryColor}00 0%, 
              ${primaryColor} 50%,
              ${primaryColor}00 100%
            )`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        <motion.div
          style={{
            fontSize: '24px',
            marginBottom: '30px',
            background: `linear-gradient(45deg, ${theme.text}, ${primaryColor})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: `drop-shadow(0 0 10px ${primaryColor}66)`,
            position: 'relative',
            zIndex: 1
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '28px', marginBottom: '10px' }}
          >
            Hi {username}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ fontSize: '16px', opacity: 0.8, marginBottom: '8px' }}
          >
            Welcome to TFY Utility Hub
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ fontSize: '14px', opacity: 0.6, lineHeight: '1.4' }}
          >
            Your all-in-one solution for system optimization,
            <br />gaming tools, and essential utilities
          </motion.p>
        </motion.div>

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
            gap: '10px',
            boxShadow: `0 0 20px ${primaryColor}40`,
            width: '100%',
            position: 'relative',
            zIndex: 1
          }}
        >
          <FiUser size={20} style={{ color: primaryColor }} />
          Continue as Guest
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Login;