import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, 
  FiDownload, 
  FiTool, 
  FiGamepad2, 
  FiRefreshCw, 
  FiSettings,
  FiUser,
  FiLogOut
} from 'react-icons/fi';
import { invoke } from '@tauri-apps/api/tauri';
import StarBorder from '../StarBorder';

const Sidebar = ({ activeTab, setActiveTab, username, userProfilePic }) => {
  const [accentColor, setAccentColor] = useState('#8b5cf6');
  const [systemInfo, setSystemInfo] = useState({
    username: 'User',
    os: 'Windows',
    uptime: '0h 0m'
  });

  useEffect(() => {
    // Load accent color
    const savedColor = localStorage.getItem('accentColor');
    if (savedColor) {
      setAccentColor(savedColor);
    }

    // Listen for accent color changes
    const handleColorChange = (event) => {
      setAccentColor(event.detail);
    };
    window.addEventListener('accentColorChange', handleColorChange);

    // Get system info
    const getSystemInfo = async () => {
      try {
        const info = await invoke('get_system_info');
        setSystemInfo(info);
      } catch (error) {
        console.error('Failed to get system info:', error);
      }
    };

    getSystemInfo();

    return () => {
      window.removeEventListener('accentColorChange', handleColorChange);
    };
  }, []);

  const menuItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'Apps', label: 'Downloads', icon: FiDownload },
    { id: 'Tools', label: 'Tweaks', icon: FiTool },
    { id: 'Gaming', label: 'Gaming Tweaks', icon: FiGamepad2 },
    { id: 'Updates', label: 'Updates', icon: FiRefreshCw },
    { id: 'Settings', label: 'Settings', icon: FiSettings }
  ];

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    localStorage.removeItem('savedLogin');
    window.location.reload();
  };

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        width: '280px',
        height: '100vh',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: `1px solid ${accentColor}33`,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Background */}
      <motion.div
        animate={{
          background: [
            `radial-gradient(circle at 20% 20%, ${accentColor}15 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 80%, ${accentColor}15 0%, transparent 50%)`,
            `radial-gradient(circle at 20% 20%, ${accentColor}15 0%, transparent 50%)`
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0
        }}
      />

      {/* Navigation Menu */}
      <div style={{ 
        flex: 1, 
        padding: '24px 16px',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StarBorder color={isActive ? accentColor : 'transparent'} speed="3s">
                <motion.button
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    background: isActive 
                      ? `linear-gradient(135deg, ${accentColor}22, ${accentColor}11)`
                      : 'rgba(255, 255, 255, 0.03)',
                    border: isActive 
                      ? `1px solid ${accentColor}66`
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: isActive ? accentColor : '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '15px',
                    fontWeight: isActive ? '600' : '500',
                    transition: 'all 0.2s',
                    boxShadow: isActive 
                      ? `0 8px 32px ${accentColor}33`
                      : 'none'
                  }}
                >
                  <Icon size={20} />
                  {item.label}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        marginLeft: 'auto',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: accentColor,
                        boxShadow: `0 0 10px ${accentColor}`
                      }}
                    />
                  )}
                </motion.button>
              </StarBorder>
            </motion.div>
          );
        })}
      </div>

      {/* User Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{
          padding: '20px 16px',
          borderTop: `1px solid ${accentColor}33`,
          zIndex: 1
        }}
      >
        <StarBorder color={accentColor} speed="4s">
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '16px',
            border: `1px solid ${accentColor}33`
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: userProfilePic 
                  ? `url(${userProfilePic})` 
                  : `linear-gradient(135deg, ${accentColor}, ${accentColor}aa)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `2px solid ${accentColor}66`,
                boxShadow: `0 0 20px ${accentColor}33`
              }}>
                {!userProfilePic && <FiUser size={18} color="white" />}
              </div>
              <div>
                <div style={{
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '2px'
                }}>
                  {username}
                </div>
                <div style={{
                  color: '#a0a0a0',
                  fontSize: '12px'
                }}>
                  {systemInfo.os} • {systemInfo.uptime}
                </div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#ffffff',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderColor = accentColor;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <FiLogOut size={14} />
              Sign Out
            </motion.button>
          </div>
        </StarBorder>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;