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
        background: theme.background,
        zIndex: 1000,
        overflow: 'hidden'
      }}
    >
      {/* Background Glow Effects */}
      <motion.div
        style={{
          position: 'absolute',
          width: '150%',
          height: '150%',
          background: `radial-gradient(circle, ${primaryColor}22 0%, transparent 70%)`,
          filter: 'blur(80px)',
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%',
          pointerEvents: 'none'
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `linear-gradient(45deg, ${primaryColor}11, ${primaryColor}33)`,
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />

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
          overflow: 'hidden',
          backdropFilter: 'blur(10px)'
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(90deg, transparent, ${primaryColor}44, transparent)`,
            filter: 'blur(5px)',
            pointerEvents: 'none'
          }}
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1
          }}
        />

        <motion.div
          style={{
            fontSize: '24px',
            marginBottom: '30px',
            position: 'relative',
            zIndex: 1
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ 
              fontSize: '28px', 
              marginBottom: '10px',
              background: `linear-gradient(45deg, ${theme.text}, ${primaryColor})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Hi {username}!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ fontSize: '16px', opacity: 0.8 }}
          >
            Welcome to TFY Utility Hub - Enhance your system performance and gaming experience.
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
            zIndex: 1,
            backdropFilter: 'blur(5px)'
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