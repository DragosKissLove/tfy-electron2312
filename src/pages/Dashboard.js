import React, { useState, useEffect } from 'react';
import { FiDownload, FiTool, FiActivity, FiCpu, FiHardDrive, FiMonitor, FiWifi, FiShield, FiZap, FiRefreshCw } from 'react-icons/fi';
import { FaGamepad, FaMemory, FaThermometerHalf } from 'react-icons/fa';
import { invoke } from '@tauri-apps/api/tauri';
import { motion } from 'framer-motion';
import StarBorder from '../StarBorder';

const Dashboard = () => {
  const [systemInfo, setSystemInfo] = useState({
    os: 'Loading...',
    ram: 'Loading...',
    cpu: 'Loading...',
    gpu: 'Loading...'
  });
  const [systemStats, setSystemStats] = useState({
    cpuUsage: 0,
    ramUsage: 0,
    diskUsage: 0,
    temperature: 0
  });
  const [accentColor, setAccentColor] = useState('#8b5cf6');
  const [isRefreshing, setIsRefreshing] = useState(false);

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

    const getSystemInfo = async () => {
      try {
        const info = await invoke('get_system_info');
        setSystemInfo(info);
      } catch (error) {
        console.error('Failed to get system info:', error);
      }
    };

    const getSystemStats = async () => {
      try {
        const stats = await invoke('get_system_stats');
        setSystemStats(stats);
      } catch (error) {
        console.error('Failed to get system stats:', error);
      }
    };

    getSystemInfo();
    getSystemStats();
    
    // Refresh stats every 5 seconds
    const interval = setInterval(getSystemStats, 5000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('accentColorChange', handleColorChange);
    };
  }, []);

  const handleRefreshStats = async () => {
    setIsRefreshing(true);
    try {
      const [info, stats] = await Promise.all([
        invoke('get_system_info'),
        invoke('get_system_stats')
      ]);
      setSystemInfo(info);
      setSystemStats(stats);
      showNotification('Success', 'System information refreshed!');
    } catch (error) {
      showNotification('Error', 'Failed to refresh system information');
    } finally {
      setIsRefreshing(false);
    }
  };

  const quickActions = [
    {
      title: 'Clean Temp Files',
      description: 'Remove temporary files and free up disk space',
      icon: FiTool,
      action: 'clean_temp',
      color: '#10b981',
      category: 'System'
    },
    {
      title: 'System Optimization',
      description: 'Apply performance tweaks and optimizations',
      icon: FiActivity,
      action: 'run_optimization',
      color: '#3b82f6',
      category: 'Performance'
    },
    {
      title: 'Gaming Tweaks',
      description: 'Optimize system for gaming performance',
      icon: FaGamepad,
      action: 'gaming_tweaks',
      color: '#8b5cf6',
      category: 'Gaming'
    },
    {
      title: 'Download Apps',
      description: 'Install popular applications quickly',
      icon: FiDownload,
      action: 'download_apps',
      color: '#f59e0b',
      category: 'Apps'
    },
    {
      title: 'WiFi Passwords',
      description: 'View saved WiFi network passwords',
      icon: FiWifi,
      action: 'wifi_passwords',
      color: '#06b6d4',
      category: 'Network'
    },
    {
      title: 'Windows Activation',
      description: 'Activate Windows using official methods',
      icon: FiShield,
      action: 'activate_windows',
      color: '#ef4444',
      category: 'System'
    }
  ];

  const handleQuickAction = async (action) => {
    try {
      let result;
      switch (action) {
        case 'clean_temp':
          result = await invoke('clean_temp');
          break;
        case 'run_optimization':
          result = await invoke('run_optimization');
          break;
        case 'wifi_passwords':
          result = await invoke('wifi_passwords');
          break;
        case 'activate_windows':
          result = await invoke('activate_windows');
          break;
        default:
          showNotification('Info', `${action} feature coming soon!`);
          return;
      }
      
      showNotification('Success', result || `${action} completed successfully!`);
    } catch (error) {
      showNotification('Error', `Failed to execute ${action}: ${error}`);
    }
  };

  const showNotification = (type, message) => {
    const notification = document.createElement('div');
    const colors = {
      'Success': '#10b981',
      'Error': '#ef4444',
      'Info': accentColor
    };
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.95);
      color: white;
      padding: 16px 20px;
      border-radius: 12px;
      border: 1px solid ${colors[type]};
      box-shadow: 0 0 20px ${colors[type]}66;
      z-index: 10000;
      max-width: 300px;
      backdrop-filter: blur(10px);
      animation: slideIn 0.3s ease-out;
    `;
    
    notification.innerHTML = `
      <div style="font-weight: 600; margin-bottom: 4px; color: ${colors[type]};">${type}</div>
      <div style="font-size: 14px; opacity: 0.9;">${message}</div>
    `;

    if (!document.getElementById('notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 4000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ padding: '24px', height: '100vh', overflow: 'auto' }}
    >
      <motion.div variants={itemVariants} style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#ffffff', 
          marginBottom: '8px',
          background: `linear-gradient(135deg, ${accentColor}, ${accentColor}aa)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Magic Bento Dashboard
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#a0a0a0' 
        }}>
          Welcome to TFY Tool - Your comprehensive system optimization hub
        </p>
      </motion.div>

      {/* Magic Bento Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(3, 200px)',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {/* System Information - Large Card */}
        <motion.div 
          variants={itemVariants}
          style={{
            gridColumn: 'span 2',
            gridRow: 'span 2',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '24px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${accentColor}, transparent)`
          }} />
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <FiMonitor style={{ color: accentColor }} />
              System Information
            </h3>
            
            <StarBorder color={accentColor} speed="4s">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefreshStats}
                disabled={isRefreshing}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '8px',
                  color: accentColor,
                  padding: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <FiRefreshCw 
                  size={16} 
                  style={{ 
                    animation: isRefreshing ? 'spin 1s linear infinite' : 'none'
                  }} 
                />
              </motion.button>
            </StarBorder>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px'
          }}>
            {[
              { label: 'Operating System', value: systemInfo.os, icon: FiMonitor },
              { label: 'Processor', value: systemInfo.cpu, icon: FiCpu },
              { label: 'Memory', value: systemInfo.ram, icon: FaMemory },
              { label: 'Graphics Card', value: systemInfo.gpu, icon: FiHardDrive }
            ].map((stat, index) => (
              <StarBorder key={index} color={accentColor} speed="6s">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <stat.icon size={16} style={{ color: accentColor }} />
                    <span style={{
                      fontSize: '12px',
                      color: '#a0a0a0',
                      fontWeight: '500'
                    }}>
                      {stat.label}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#ffffff',
                    display: 'block'
                  }}>
                    {stat.value}
                  </span>
                </motion.div>
              </StarBorder>
            ))}
          </div>
        </motion.div>

        {/* System Performance - Tall Card */}
        <motion.div 
          variants={itemVariants}
          style={{
            gridColumn: 'span 1',
            gridRow: 'span 3',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '24px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${accentColor}, transparent)`
          }} />
          
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '20px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FiActivity style={{ color: accentColor }} />
            Live Stats
          </h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {[
              { label: 'CPU Usage', value: systemStats.cpuUsage, icon: FiCpu, unit: '%', color: '#3b82f6' },
              { label: 'RAM Usage', value: systemStats.ramUsage, icon: FaMemory, unit: '%', color: '#10b981' },
              { label: 'Disk Usage', value: systemStats.diskUsage, icon: FiHardDrive, unit: '%', color: '#f59e0b' },
              { label: 'Temperature', value: systemStats.temperature, icon: FaThermometerHalf, unit: '°C', color: '#ef4444' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <stat.icon size={16} style={{ color: stat.color }} />
                    <span style={{ fontSize: '14px', color: '#a0a0a0' }}>{stat.label}</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>
                    {stat.value}{stat.unit}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    style={{
                      height: '100%',
                      background: `linear-gradient(90deg, ${stat.color}, ${stat.color}aa)`,
                      borderRadius: '4px'
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions - Wide Card */}
        <motion.div 
          variants={itemVariants}
          style={{
            gridColumn: 'span 1',
            gridRow: 'span 1',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${accentColor}, transparent)`
          }} />
          
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '16px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FiZap style={{ color: accentColor }} />
            Quick Actions
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px'
          }}>
            {quickActions.slice(0, 4).map((action, index) => (
              <StarBorder key={index} color={action.color} speed="5s">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickAction(action.action)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: `${action.color}20`,
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s'
                  }}
                >
                  <action.icon size={20} color={action.color} />
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#ffffff',
                    textAlign: 'center'
                  }}>
                    {action.title.split(' ')[0]}
                  </span>
                </motion.button>
              </StarBorder>
            ))}
          </div>
        </motion.div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </motion.div>
  );
};

export default Dashboard;