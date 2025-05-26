import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const tools = [
  { name: 'WinRAR Crack', function: 'winrar_crack' },
  { name: 'Atlas Tools', function: 'install_atlas_tools' },
  { name: 'WiFi Passwords', function: 'wifi_passwords' },
  { name: 'Activate Windows', function: 'activate_windows' },
  { name: 'Spotify Modded', function: 'install_spicetify_from_github' }
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
      setStatus(result.message || 'Operation completed successfully!');
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setActiveButton(null);
    }
  };

  const buttonVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { 
      scale: 1.02,
      boxShadow: `0 8px 20px ${primaryColor}40`,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 },
    exit: { scale: 0.95, opacity: 0 }
  };

  return (
    <motion.div
      style={{ padding: '30px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <motion.div 
        style={{ 
          marginBottom: '20px',
          background: theme.cardBg,
          padding: '20px',
          borderRadius: '16px',
          border: `1px solid ${primaryColor}33`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
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
        <h2 style={{ 
          fontSize: '24px',
          fontWeight: 'bold',
          background: `linear-gradient(45deg, ${theme.text}, ${primaryColor})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: `drop-shadow(0 0 10px ${primaryColor}66)`
        }}>
          Useful Tools
        </h2>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <AnimatePresence mode="popLayout">
          {tools.map((tool, index) => (
            <motion.button
              key={tool.function}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              exit="exit"
              onClick={() => handleClick(tool.function)}
              transition={{ 
                duration: 0.3,
                delay: index * 0.1,
                type: "spring",
                stiffness: 500,
                damping: 25
              }}
              style={{
                height: '48px',
                border: `1px solid ${theme.border}`,
                borderRadius: '12px',
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
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ 
                  scaleX: activeButton === tool.function ? 1 : 0 
                }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: primaryColor,
                  transformOrigin: 'left'
                }}
              />
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
              borderRadius: '8px',
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