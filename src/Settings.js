import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiRefreshCw } from 'react-icons/fi';

const Settings = () => {
  const { primaryColor, setPrimaryColor, theme } = useTheme();
  const [updateStatus, setUpdateStatus] = useState('');
  const [isChecking, setIsChecking] = useState(false);

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
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: `linear-gradient(90deg, ${primaryColor}00, ${primaryColor}, ${primaryColor}00)`
            }}
          />
          <h3 style={{ marginBottom: 16 }}>Appearance</h3>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 16 
          }}>
            <motion.div
              style={{
                position: 'relative',
                width: '200px',
                height: '40px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '20px',
                padding: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <input
                type="color"
                value={primaryColor}
                onChange={handleColorChange}
                style={{
                  width: '32px',
                  height: '32px',
                  border: 'none',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  background: 'transparent',
                  marginRight: '10px'
                }}
              />
              <span style={{ 
                color: theme.text,
                fontSize: '14px',
                opacity: 0.8
              }}>
                Accent Color
              </span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            padding: 20,
            borderRadius: 16,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div 
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: `linear-gradient(90deg, ${primaryColor}00, ${primaryColor}, ${primaryColor}00)`
            }}
          />
          <h3 style={{ marginBottom: 16 }}>Updates</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCheckUpdates}
            disabled={isChecking}
            style={{
              padding: '12px 24px',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.05)',
              border: 'none',
              color: theme.text,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <FiRefreshCw 
              style={{ 
                animation: isChecking ? 'spin 1s linear infinite' : 'none',
                color: primaryColor
              }} 
            />
            Check for Updates
            {isChecking && (
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '2px',
                  background: primaryColor,
                  width: '100%'
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
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
                  border: '1px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {updateStatus}
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: primaryColor,
                    opacity: 0.5
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;