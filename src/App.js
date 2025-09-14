import React, { useState, useEffect } from 'react';
import './App.css';
import { invoke } from '@tauri-apps/api/tauri';
import { FiMinus, FiX, FiMaximize2, FiUser } from 'react-icons/fi';
import { appWindow } from '@tauri-apps/api/window';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Apps from './pages/Apps';
import Tools from './pages/Tools';
import Gaming from './pages/Gaming';
import Updates from './pages/Updates';
import Settings from './pages/Settings';
import Login from './components/Login';

const App = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [username, setUsername] = useState('User');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accentColor, setAccentColor] = useState('#8b5cf6');

  useEffect(() => {
    // Load accent color
    const savedColor = localStorage.getItem('accentColor');
    if (savedColor) {
      setAccentColor(savedColor);
    }

    // Listen for accent color changes
    const handleColorChange = (event) => {
      setAccentColor(event.detail);
    };
    window.addEventListener('accentColorChange', handleColorChange);

    // Check for existing session
    const checkSession = async () => {
      try {
        const savedSession = localStorage.getItem('userSession');
        if (savedSession) {
          const sessionData = JSON.parse(savedSession);
          setUser(sessionData);
          setUsername(sessionData.username || sessionData.name);
        }
        
        // Get system username
        const systemUsername = await invoke('get_username');
        if (!savedSession) {
          setUsername(systemUsername);
        }
      } catch (error) {
        console.error('Failed to get username:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    return () => {
      window.removeEventListener('accentColorChange', handleColorChange);
    };
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setUsername(userData.username || userData.name);
    localStorage.setItem('userSession', JSON.stringify(userData));
  };

  const handleMinimize = () => {
    appWindow.minimize();
  };

  const handleMaximize = () => {
    appWindow.toggleMaximize();
  };

  const handleClose = () => {
    appWindow.close();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Apps':
        return <Apps />;
      case 'Tools':
        return <Tools />;
      case 'Gaming':
        return <Gaming />;
      case 'Updates':
        return <Updates />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (isLoading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        color: 'white'
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{
            width: '40px',
            height: '40px',
            border: `3px solid ${accentColor}33`,
            borderTop: `3px solid ${accentColor}`,
            borderRadius: '50%'
          }}
        />
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      {/* Custom Title Bar */}
      <motion.div 
        className="titlebar" 
        data-tauri-drag-region
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${accentColor}33`
        }}
      >
        <div className="titlebar-left">
          <motion.div 
            className="app-icon"
            whileHover={{ scale: 1.1, rotate: 5 }}
            style={{
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}aa)`,
              borderRadius: '8px',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>TFY</span>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="app-title" style={{ fontSize: '14px', fontWeight: '600' }}>
              TFY Tool
            </span>
            <span style={{ fontSize: '11px', opacity: 0.7, color: accentColor }}>
              v3.0.0
            </span>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              border: `1px solid ${accentColor}33`
            }}
          >
            <FiUser size={14} style={{ color: accentColor }} />
            <span style={{ fontSize: '12px', color: '#ffffff' }}>{username}</span>
          </motion.div>
          
          <div className="titlebar-right">
            <motion.button 
              className="titlebar-button" 
              onClick={handleMinimize}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.9 }}
            >
              <FiMinus size={14} />
            </motion.button>
            <motion.button 
              className="titlebar-button" 
              onClick={handleMaximize}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.9 }}
            >
              <FiMaximize2 size={14} />
            </motion.button>
            <motion.button 
              className="titlebar-button close" 
              onClick={handleClose}
              whileHover={{ backgroundColor: '#e53e3e' }}
              whileTap={{ scale: 0.9 }}
            >
              <FiX size={14} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="app-content">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          username={username}
        />
        <main className="main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default App;