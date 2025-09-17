import React, { useState, useEffect } from 'react';
import { FiDownload, FiTool, FiActivity, FiCpu, FiHardDrive, FiMonitor, FiWifi, FiShield, FiZap } from 'react-icons/fi';
import { FaGamepad, FaMemory, FaThermometerHalf } from 'react-icons/fa';
import { invoke } from '@tauri-apps/api/tauri';
import { motion } from 'framer-motion';

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
        setSystemInfo({
          os: 'Windows 11 Pro',
          ram: '16GB DDR4',
          cpu: 'Intel Core i7-12700K',
          gpu: 'NVIDIA GeForce RTX 3080'
        });
      }
    };

    // Simulate system stats (in real app, these would come from system monitoring)
    const updateStats = () => {
      setSystemStats({
        cpuUsage: Math.floor(Math.random() * 30) + 10,
        ramUsage: Math.floor(Math.random() * 40) + 30,
        diskUsage: Math.floor(Math.random() * 20) + 60,
        temperature: Math.floor(Math.random() * 15) + 45
      });
    };

    getSystemInfo();
    updateStats();
    const interval = setInterval(updateStats, 3000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('accentColorChange', handleColorChange);
    };
  }, []);

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
          result = await invoke('run_function', { name: 'clean_temp' });
          break;
        case 'run_optimization':
          result = await invoke('run_function', { name: 'run_optimization' });
          break;
        case 'wifi_passwords':
          result = await invoke('run_function', { name: 'wifi_passwords' });
          break;
        case 'activate_windows':
          result = await invoke('run_function', { name: 'activate_windows' });
          break;
        default:
          console.log(`Action ${action} not implemented yet`);
          return;
      }
      
      // Show custom notification
      showNotification('Success', result || `${action} completed successfully!`);
    } catch (error) {
      showNotification('Error', `Failed to execute ${action}: ${error}`);
    }
  };

  const showNotification = (title, message) => {
    // Create custom notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 16px 20px;
      border-radius: 12px;
      border: 1px solid ${accentColor};
      box-shadow: 0 0 20px ${accentColor}66;
      z-index: 10000;
      max-width: 300px;
      backdrop-filter: blur(10px);
      animation: slideIn 0.3s ease-out;
    `;
    
    notification.innerHTML = `
      <div style="font-weight: 600; margin-bottom: 4px; color: ${accentColor};">${title}</div>
      <div style="font-size: 14px; opacity: 0.9;">${message}</div>
    `;

    // Add animation keyframes
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

    // Remove after 4 seconds
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
          Dashboard
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#a0a0a0' 
        }}>
          Welcome to TFY Tool - Your comprehensive system optimization hub
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* System Information */}
        <motion.div 
          variants={itemVariants}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
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
            height: '3px',
            background: `linear-gradient(90deg, ${accentColor}, transparent)`
          }} />
          
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '20px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FiMonitor style={{ color: accentColor }} />
            System Information
          </h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {[
              { label: 'Operating System', value: systemInfo.os, icon: FiMonitor },
              { label: 'Processor', value: systemInfo.cpu, icon: FiCpu },
              { label: 'Memory', value: systemInfo.ram, icon: FaMemory },
              { label: 'Graphics Card', value: systemInfo.gpu, icon: FiHardDrive }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <stat.icon size={16} style={{ color: accentColor }} />
                  <span style={{
                    fontSize: '14px',
                    color: '#a0a0a0'
                  }}>
                    {stat.label}
                  </span>
                </div>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#ffffff'
                }}>
                  {stat.value}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* System Performance */}
        <motion.div 
          variants={itemVariants}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
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
            height: '3px',
            background: `linear-gradient(90deg, ${accentColor}, transparent)`
          }} />
          
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '20px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FiActivity style={{ color: accentColor }} />
            System Performance
          </h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {[
              { label: 'CPU Usage', value: systemStats.cpuUsage, icon: FiCpu, unit: '%' },
              { label: 'RAM Usage', value: systemStats.ramUsage, icon: FaMemory, unit: '%' },
              { label: 'Disk Usage', value: systemStats.diskUsage, icon: FiHardDrive, unit: '%' },
              { label: 'Temperature', value: systemStats.temperature, icon: FaThermometerHalf, unit: '°C' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <stat.icon size={16} style={{ color: accentColor }} />
                    <span style={{ fontSize: '14px', color: '#a0a0a0' }}>{stat.label}</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>
                    {stat.value}{stat.unit}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    style={{
                      height: '100%',
                      background: `linear-gradient(90deg, ${accentColor}, ${accentColor}aa)`,
                      borderRadius: '3px'
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <h3 style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '20px',
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {quickActions.map((action, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: `0 8px 32px ${action.color}33`
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleQuickAction(action.action)}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: action.color
              }} />
              
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                marginBottom: '12px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: `${action.color}20`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <action.icon size={24} color={action.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px'
                  }}>
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#ffffff',
                      margin: 0
                    }}>
                      {action.title}
                    </h4>
                    <span style={{
                      fontSize: '12px',
                      color: action.color,
                      background: `${action.color}20`,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontWeight: '500'
                    }}>
                      {action.category}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: '#a0a0a0',
                    lineHeight: '1.5',
                    margin: 0
                  }}>
                    {action.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;