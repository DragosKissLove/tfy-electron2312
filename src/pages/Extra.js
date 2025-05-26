import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ThemeContext';

const Extra = () => {
  const { theme, primaryColor } = useTheme();
  const [status, setStatus] = useState('');
  const [robloxVersion, setRobloxVersion] = useState('');

  const handleOptimization = async () => {
    try {
      if (window.api) {
        setStatus('Running optimization...');
        await window.api.runPythonFunction('run_optimization');
        setStatus('Optimization completed!');
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  const handleCleanTemp = async () => {
    try {
      if (window.api) {
        setStatus('Cleaning temporary files...');
        await window.api.runPythonFunction('clean_temp');
        setStatus('Temporary files cleaned!');
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

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
      <h2 style={{ marginBottom: 20 }}>🎮 Extra Features</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOptimization}
          style={{
            padding: '12px 24px',
            background: theme.cardBg,
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            color: theme.text,
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: 500,
            boxShadow: theme.shadow
          }}
        >
          🚀 Run Optimization
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCleanTemp}
          style={{
            padding: '12px 24px',
            background: theme.cardBg,
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            color: theme.text,
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: 500,
            boxShadow: theme.shadow
          }}
        >
          🧹 Clean Temp Files
        </motion.button>

        <div style={{ marginTop: 20 }}>
          <h3 style={{ marginBottom: 10 }}>🎮 Roblox Downgrade</h3>
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
              border: `1px solid ${theme.border}`,
              background: theme.cardBg,
              color: theme.text
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
              boxShadow: theme.shadow,
              opacity: robloxVersion ? 1 : 0.7
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