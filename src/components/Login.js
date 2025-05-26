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
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        zIndex: 1000,
        overflow: 'hidden'
      }}
    >
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${primaryColor}11 0%, transparent 70%)`,
            filter: 'blur(40px)',
            opacity: 0.2,
            pointerEvents: 'none'
          }}
          animate={{
            x: ['-30%', '30%'],
            y: ['-30%', '30%'],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + i,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: i * 0.3
          }}
        />
      ))}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: `0 0 30px ${primaryColor}22`,
          border: `1px solid ${primaryColor}33`,
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
              color: '#fff'
            }}
          >
            Hi {username}!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ 
              fontSize: '16px', 
              color: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            Welcome to TFY Utility Hub
          </motion.p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: `${primaryColor}33` }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGuestLogin}
          style={{
            padding: '12px',
            background: 'transparent',
            border: `1px solid ${primaryColor}44`,
            borderRadius: '12px',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            width: '100%',
            position: 'relative',
            zIndex: 1,
            backdropFilter: 'blur(5px)',
            transition: 'all 0.3s ease'
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