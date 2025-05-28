import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const tools = [
  { name: 'WinRAR Crack', function: 'winrar_crack' },
  { name: 'Atlas Tools', function: 'install_atlas_tools' },
  { name: 'WiFi Passwords', function: 'wifi_passwords' },
  { name: 'Activate Windows', function: 'activate_windows' },
  { name: 'Spotify Modded', function: 'install_spicetify_from_github' },
  { name: 'TFY Optimizations', function: 'run_optimization' },
  { name: 'Clean Temp Files', function: 'clean_temp' }
];

const Tools = () => {
  const { theme, primaryColor } = useTheme();
  const [activeButton, setActiveButton] = useState(null);
  const [status, setStatus] = useState('');

  const handleClick = async (funcName) => {
    try {
      setActiveButton(funcName);
      setStatus('Processing...');
      const result = await window.electron.runFunction(funcName);
      setStatus(result || 'Operation completed successfully!');
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setActiveButton(null);
    }
  };

  return (
    <motion.div
      style={{ padding: '30px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <h2 style={{ 
        fontSize: '28px',
        fontWeight: '600',
        marginBottom: '20px',
        color: theme.text,
        borderBottom: `2px solid ${primaryColor}`,
        paddingBottom: '10px',
        display: 'inline-block'
      }}>
        Useful Tools
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <AnimatePresence mode="popLayout">
          {tools.map((tool, index) => (
            <motion.button
              key={tool.function}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.1
              }}
              onClick={() => handleClick(tool.function)}
              style={{
                height: '48px',
                border: `1px solid ${theme.border}`,
                background: theme.cardBg,
                color: theme.text,
                fontSize: '15px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `0 4px 12px ${primaryColor}33`
              }}
            >
              {activeButton === tool.function && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1,
                    rotate: 360 
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    width: 16,
                    height: 16,
                    border: '2px solid #fff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    marginRight: 8
                  }}
                />
              )}
              {tool.name}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              marginTop: '20px',
              padding: '12px',
              background: theme.cardBg,
              border: `1px solid ${theme.border}`,
              color: theme.text
            }}
          >
            {status}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Tools;