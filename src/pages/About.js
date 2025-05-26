import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';
import { FiGithub, FiMessageCircle } from 'react-icons/fi';

const About = () => {
  const { theme } = useTheme();

  const handleOpenDiscord = async () => {
    try {
      await window.api.runPythonFunction('open_discord');
    } catch (error) {
      console.error('Error opening Discord:', error);
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
      <h2 style={{ marginBottom: 20 }}>📘 About TFY Tool</h2>
      
      <div style={{
        background: theme.cardBg,
        padding: '24px',
        borderRadius: '16px',
        border: `1px solid ${theme.border}`,
        marginBottom: '24px'
      }}>
        <h3 style={{ marginBottom: '16px' }}>Welcome to TFY Tool 2025! 🚀</h3>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          TFY Tool is your all-in-one Windows utility suite, designed to enhance your PC experience. 
          From system optimization to gaming tools, we've got everything you need to maximize your 
          Windows performance and customize your setup.
        </p>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          Features include:
          • System optimization
          • Gaming tools and tweaks
          • Windows activation
          • Popular software installation
          • And much more!
        </p>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpenDiscord}
          style={{
            padding: '12px 24px',
            background: theme.cardBg,
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            color: theme.text,
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: 500,
            boxShadow: theme.shadow,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FiMessageCircle />
          Join Our Discord
        </motion.button>
      </div>
    </motion.div>
  );
};

export default About;