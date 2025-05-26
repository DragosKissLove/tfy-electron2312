import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ThemeContext';

const Extra = () => {
  const { theme, primaryColor } = useTheme();
  const [status, setStatus] = useState('');
  const [robloxVersion, setRobloxVersion] = useState('');

  const handleRobloxDowngrade = async () => {
    try {
      if (window.api && robloxVersion) {
        setStatus('Starting Roblox downgrade...');
        await window.api.runPythonFunction('download_roblox_player', robloxVersion);
        setStatus('Roblox downgrade completed!');
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
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
      <h2 style={{ marginBottom: 20 }}>Extra Features</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{
          marginTop: 20,
          padding: '24px',
          borderRadius: '16px',
          background: theme.cardBg,
          border: `1px solid ${theme.border}`,
          position: 'relative',
          overflow: 'hidden'
        }}>
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
              borderRadius: '16px',
              padding: '1px',
              background: `linear-gradient(90deg, 
                ${primaryColor}00 0%, 
                ${primaryColor} 50%,
                ${primaryColor}00 100%
              )`,
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
            }}
          />
          <h3 style={{ 
            marginBottom: 10,
            color: primaryColor,
            filter: `drop-shadow(0 0 10px ${primaryColor}66)`
          }}>Roblox Downgrade</h3>
          <input
            type="text"
            value={robloxVersion}
            onChange={(e) => setRobloxVersion(e.target.value)}
            placeholder="Enter Roblox version hash"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '8px',
              border: `1px solid ${primaryColor}33`,
              background: theme.cardBg,
              color: theme.text,
              boxShadow: `0 0 20px ${primaryColor}22`
            }}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRobloxDowngrade}
            disabled={!robloxVersion}
            style={{
              padding: '12px 24px',
              background: robloxVersion ? primaryColor : theme.cardBg,
              border: `1px solid ${theme.border}`,
              borderRadius: '12px',
              color: robloxVersion ? '#FFF' : theme.text,
              cursor: robloxVersion ? 'pointer' : 'not-allowed',
              fontSize: '15px',
              fontWeight: 500,
              opacity: robloxVersion ? 1 : 0.7,
              boxShadow: `0 0 20px ${primaryColor}40`
            }}
          >
            Downgrade Roblox
          </motion.button>
        </div>

        <AnimatePresence>
          {status && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                padding: '12px',
                borderRadius: '8px',
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                marginTop: '20px'
              }}
            >
              {status}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Extra;