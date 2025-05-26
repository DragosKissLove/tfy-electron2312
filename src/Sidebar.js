import React from 'react';
import { useTheme } from './ThemeContext';
import { motion } from 'framer-motion';
import { FiGrid, FiTool, FiStar, FiSettings, FiInfo } from 'react-icons/fi';

const tabs = [
  { id: 'Apps', icon: FiGrid },
  { id: 'Tools', icon: FiTool },
  { id: 'Extra', icon: FiStar },
  { id: 'Settings', icon: FiSettings },
  { id: 'About', icon: FiInfo }
];

const Sidebar = ({ active, onChange }) => {
  const { theme, primaryColor } = useTheme();

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
      {tabs.map(({ id, icon: Icon }) => (
        <motion.button
          key={id}
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
      ))}
    </motion.div>
  );
};

export default Sidebar;