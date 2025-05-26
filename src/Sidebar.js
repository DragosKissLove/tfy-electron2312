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
        background: theme.cardBg,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: `1px solid ${theme.border}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 0',
        gap: 16,
        position: 'sticky',
        top: 0
      }}
    >
      {/* Navigation Tabs */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
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
                borderRadius: '12px',
                background: id === active ? primaryColor : 'transparent',
                color: id === active ? '#FFF' : theme.text,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative'
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
                    borderRadius: '12px',
                    background: primaryColor,
                    zIndex: -1
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
                background: theme.cardBg,
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '14px',
                color: theme.text,
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                boxShadow: `0 4px 12px ${primaryColor}33`,
                border: `1px solid ${theme.border}`,
                zIndex: 1000
              }}
            >
              {tooltip}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Version & Logout */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: 8,
        marginTop: 'auto',
        paddingBottom: 16
      }}>
        <motion.span
          style={{
            fontSize: '10px',
            color: theme.text,
            opacity: 0.3
          }}
        >
          v3.0.0
        </motion.span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          style={{
            width: 48,
            height: 48,
            border: 'none',
            borderRadius: '12px',
            background: 'transparent',
            color: theme.text,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          <FiLogOut size={24} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;