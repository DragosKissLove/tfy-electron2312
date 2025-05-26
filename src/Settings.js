import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMoon, FiSun, FiRefreshCw } from 'react-icons/fi';

const Settings = () => {
  const { darkMode, setDarkMode, primaryColor, setPrimaryColor } = useTheme();
  const [updateStatus, setUpdateStatus] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleColorChange = (e) => {
    setPrimaryColor(e.target.value);
  };

  const handleCheckUpdates = async () => {
    try {
      setIsChecking(true);
      setUpdateStatus('Checking for updates...');
      const result = await window.electron.runFunction('check-updates');
      
      if (result.hasUpdate) {
        setUpdateStatus(`Update available! Version ${result.latestVersion}\n${result.changelog}`);
      } else {
        setUpdateStatus('You have the latest version!');
      }
    } catch (error) {
      setUpdateStatus(`Error checking updates: ${error.message}`);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <motion.div
      style={{ padding: 30 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h2 
        style={{
          marginBottom: 20,
          color: theme.text,
          padding: '10px',
          borderRadius: '8px'
        }}
      >
        Settings
      </motion.h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            padding: 20,
            borderRadius: 16,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <h3 style={{ marginBottom: 16 }}>Appearance</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleThemeToggle}
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              {darkMode ? <FiMoon /> : <FiSun />}
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </motion.button>
            <input
              type="color"
              value={primaryColor}
              onChange={handleColorChange}
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                background: 'transparent'
              }}
            />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            padding: 20,
            borderRadius: 16,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <h3 style={{ marginBottom: 16 }}>Updates</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCheckUpdates}
            disabled={isChecking}
            style={{
              padding: '12px 24px',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <FiRefreshCw style={{ animation: isChecking ? 'spin 1s linear infinite' : 'none' }} />
            Check for Updates
          </motion.button>

          <AnimatePresence>
            {updateStatus && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  marginTop: 16,
                  padding: 12,
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                {updateStatus}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;