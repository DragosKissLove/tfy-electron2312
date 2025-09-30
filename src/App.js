import React, { useState, useEffect } from 'react';
import { FiMinus, FiX, FiMaximize2, FiUser } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Apps from './pages/Apps';
import Tools from './pages/Tools';
import Gaming from './pages/Gaming';
import Updates from './pages/Updates';
import Settings from './pages/Settings';
import Login from './components/Login';
import StarBorder from './StarBorder';

const App = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [username, setUsername] = useState('User');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accentColor, setAccentColor] = useState('#8b5cf6');
  const [userProfilePic, setUserProfilePic] = useState(null);

  useEffect(() => {
    // Load accent color
    const savedColor = localStorage.getItem('accentColor');
    if (savedColor) {
      setAccentColor(savedColor);
      // Apply accent color to CSS custom properties
      document.documentElement.style.setProperty('--accent-color', savedColor);
      // Apply hue rotation to logo
      applyLogoHue(savedColor);
    }

    // Listen for accent color changes
    const handleColorChange = (event) => {
      setAccentColor(event.detail);
      document.documentElement.style.setProperty('--accent-color', event.detail);
      applyLogoHue(event.detail);
    };
    window.addEventListener('accentColorChange', handleColorChange);

    // Check for existing session
    const checkSession = async () => {
      try {
        // Get user profile picture
        try {
          const profilePic = await window.electron.runFunction('getUserProfilePicture');
          setUserProfilePic(profilePic);
        } catch (error) {
          console.log('Could not get profile picture:', error);
        }
        
        const savedSession = localStorage.getItem('userSession');
        if (savedSession) {
          const sessionData = JSON.parse(savedSession);
          setUser(sessionData);
          setUsername(sessionData.username || sessionData.name);
        }
        
        // Get system username
        const systemUsername = await window.electron.runFunction('getUsername');
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

  const applyLogoHue = (color) => {
    // Convert hex to HSL and apply hue rotation
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    
    if (max !== min) {
      const d = max - min;
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    
    const hueRotation = h * 360;
    document.documentElement.style.setProperty('--logo-hue', `${hueRotation}deg`);
  };

  // Apply accent color globally
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accentColor);
  }, [accentColor]);

  const handleLogin = (userData) => {
    setUser(userData);
    setUsername(userData.username || userData.name);
    localStorage.setItem('userSession', JSON.stringify(userData));
  };

  const handleMinimize = () => {
    window.electron.minimize();
  };

  const handleMaximize = () => {
    window.electron.toggleMaximize();
  };

  const handleClose = () => {
    window.electron.close();
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
        <StarBorder color={accentColor}>
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
        </StarBorder>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app" style={{ '--accent-color': accentColor }}>
      {/* Custom Title Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          height: '60px',
          background: `linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%)`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `2px solid ${accentColor}`,
          borderRadius: '0 0 20px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background */}
        <motion.div
          animate={{
            background: [
              `linear-gradient(45deg, ${accentColor}20, transparent, ${accentColor}10)`,
              `linear-gradient(45deg, transparent, ${accentColor}20, transparent)`,
              `linear-gradient(45deg, ${accentColor}10, transparent, ${accentColor}20)`
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0
          }}
        />
        
        <div className="titlebar-left">
          {/* TFY Logo */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            style={{
              width: '45px',
              height: '45px',
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 8px 32px ${accentColor}66`,
              border: `2px solid ${accentColor}44`,
              position: 'relative',
              zIndex: 1
            }}
          >
            <span style={{
              fontSize: '20px',
              fontWeight: '800',
              color: 'white',
              textShadow: `0 0 20px ${accentColor}`,
              filter: `hue-rotate(var(--logo-hue, 0deg))`
            }}>
              TFY
            </span>
          </motion.div>
        </div>

        {/* User Info */}
        <div className="titlebar-center" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          zIndex: 1
        }}>
          <StarBorder color={accentColor} speed="4s">
            <div style={{
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              background: userProfilePic 
                ? `url(${userProfilePic})` 
                : `linear-gradient(135deg, ${accentColor}, ${accentColor}aa)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px solid ${accentColor}66`
            }}>
              {!userProfilePic && <FiUser size={16} color="white" />}
            </div>
          </StarBorder>
          <span style={{
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            textShadow: `0 0 10px ${accentColor}66`
          }}>
            {username}
          </span>
        </div>
        
        {/* Window Controls */}
        <div className="titlebar-right" style={{ zIndex: 1 }}>
          <StarBorder color={accentColor} speed="3s">
            <motion.button 
              className="titlebar-button" 
              onClick={handleMinimize}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: '35px',
                height: '35px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '10px',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '8px'
              }}
            >
              <FiMinus size={16} />
            </motion.button>
          </StarBorder>
          
          <StarBorder color={accentColor} speed="3s">
            <motion.button 
              className="titlebar-button" 
              onClick={handleMaximize}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: '35px',
                height: '35px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '10px',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '8px'
              }}
            >
              <FiMaximize2 size={16} />
            </motion.button>
          </StarBorder>
          
          <StarBorder color="#e53e3e" speed="3s">
            <motion.button 
              className="titlebar-button close" 
              onClick={handleClose}
              whileHover={{ scale: 1.1, backgroundColor: '#e53e3e' }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: '35px',
                height: '35px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '10px',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FiX size={16} />
            </motion.button>
          </StarBorder>
        </div>
      </motion.div>

      <div className="app-content">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          username={username}
          userProfilePic={userProfilePic}
        />
        <main className="main-content" style={{ 
          overflow: 'hidden auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollBehavior: 'smooth'
        }}>
          <style>
            {`
              .main-content::-webkit-scrollbar {
                display: none;
              }
              * {
                scrollbar-width: none;
                -ms-overflow-style: none;
              }
              *::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default App;