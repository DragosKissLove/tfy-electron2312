import React from 'react';
import { useTheme } from './ThemeContext';
import { motion } from 'framer-motion';
import { FiGrid, FiTool, FiStar, FiSettings, FiInfo, FiLogOut } from 'react-icons/fi';

const tabs = [
  { id: 'Apps', icon: FiGrid, tooltip: 'Install Applications' },
  { id: 'Tools', icon: FiTool, tooltip: 'System Tools' },
  { id: 'Extra', icon: FiStar, tooltip: 'Extra Features' },
  { id: 'Settings', icon: FiSettings, tooltip: 'Preferences' },
  { id: 'About', icon: FiInfo, tooltip: 'About' }
];

const Sidebar = ({ active, onChange, user }) => {
  const { theme, primaryColor } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('guestSession');
    window.location.reload();
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      style={{
        width: 80,
        height: '100vh',
        background: `linear-gradient(180deg, 
          ${theme.cardBg}CC,
          ${theme.cardBg}99
        )`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: `1px solid ${theme.border}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 0',
        gap: 16,
        position: 'sticky',
        top: 0,
        overflow: 'hidden',
        boxShadow: `0 0 30px ${primaryColor}22`
      }}
    >
      {/* Logo or Brand */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          width: 48,
          height: 48,
          borderRadius: '14px',
          background: `linear-gradient(135deg, ${primaryColor}44, ${primaryColor}22)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          boxShadow: `0 0 20px ${primaryColor}33`,
          border: `1px solid ${primaryColor}44`
        }}
      >
        <span style={{ 
          fontSize: '20px', 
          fontWeight: 'bold',
          background: `linear-gradient(135deg, ${theme.text}, ${primaryColor})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: `drop-shadow(0 0 8px ${primaryColor}66)`
        }}>
          TF
        </span>
      </motion.div>

      {/* Navigation Tabs */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 16,
        background: `linear-gradient(180deg, 
          transparent,
          ${primaryColor}11 30%,
          ${primaryColor}11 70%,
          transparent
        )`,
        padding: '20px 0',
        width: '100%',
        alignItems: 'center'
      }}>
        {tabs.map(({ id, icon: Icon, tooltip }) => (
          <motion.div
            key={id}
            style={{ position: 'relative' }}
            whileHover="hover"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(id)}
              style={{
                width: 48,
                height: 48,
                border: 'none',
                borderRadius: '14px',
                background: id === active 
                  ? `linear-gradient(135deg, ${primaryColor}, ${primaryColor}CC)`
                  : 'transparent',
                color: id === active ? '#FFF' : theme.text,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                boxShadow: id === active 
                  ? `0 0 20px ${primaryColor}66`
                  : 'none',
              }}
            >
              <Icon size={24} />
              {id === active && (
                <motion.div
                  layoutId="activeTab"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '14px',
                    background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}CC)`,
                    zIndex: -1,
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30 
                  }}
                />
              )}
            </motion.button>
            
            {/* Tooltip */}
            <motion.div
              variants={{
                hover: { opacity: 1, x: 60, transition: { duration: 0.2 } },
                initial: { opacity: 0, x: 0 }
              }}
              initial="initial"
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                background: `linear-gradient(135deg, ${theme.cardBg}EE, ${theme.cardBg}CC)`,
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '14px',
                color: theme.text,
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                boxShadow: `0 4px 12px ${primaryColor}33`,
                border: `1px solid ${theme.border}`,
                zIndex: 1000,
                backdropFilter: 'blur(8px)'
              }}
            >
              {tooltip}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Logout Button and Version */}
      <motion.div
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: 4,
          marginTop: 'auto',
          marginBottom: 20,
          background: `linear-gradient(0deg, ${primaryColor}11, transparent)`,
          width: '100%',
          padding: '20px 0'
        }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLogout}
          style={{
            width: 48,
            height: 48,
            border: `1px solid ${primaryColor}33`,
            borderRadius: '14px',
            background: `linear-gradient(135deg, ${theme.cardBg}66, ${theme.cardBg}33)`,
            color: theme.text,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: `0 0 20px ${primaryColor}22`
          }}
        >
          <FiLogOut size={24} />
        </motion.button>
        <motion.span
          style={{
            fontSize: '10px',
            color: theme.text,
            opacity: 0.4,
            textShadow: `0 0 10px ${primaryColor}66`
          }}
        >
          v3.0.0
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;