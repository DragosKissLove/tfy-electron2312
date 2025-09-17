import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiRefreshCw } from 'react-icons/fi';

const Apps = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(null);
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

    return () => {
      window.removeEventListener('accentColorChange', handleColorChange);
    };
  }, []);

  const apps = [
    { 
      name: 'Discord', 
      url: 'https://dl.discordapp.net/distro/app/stable/win/x86/1.0.9014/DiscordSetup.exe', 
      icon: '💬',
      description: 'Voice, video and text communication service for gamers',
      category: 'Communication',
      size: '~85MB'
    },
    { 
      name: 'Steam', 
      url: 'https://cdn.akamai.steamstatic.com/client/installer/SteamSetup.exe', 
      icon: '🎮',
      description: 'Digital distribution platform for PC gaming',
      category: 'Gaming',
      size: '~2MB'
    },
    { 
      name: 'Spotify', 
      url: 'https://download.scdn.co/SpotifySetup.exe', 
      icon: '🎵',
      description: 'Music streaming service with millions of songs',
      category: 'Entertainment',
      size: '~1MB'
    },
    { 
      name: 'Brave Browser', 
      url: 'https://laptop-updates.brave.com/latest/winx64', 
      icon: '🦁',
      description: 'Privacy-focused web browser with built-in ad blocker',
      category: 'Browser',
      size: '~120MB'
    },
    { 
      name: 'VLC Player', 
      url: 'https://get.videolan.org/vlc/3.0.20/win64/vlc-3.0.20-win64.exe', 
      icon: '🎬',
      description: 'Free and open source cross-platform multimedia player',
      category: 'Media',
      size: '~40MB'
    },
    { 
      name: 'WinRAR', 
      url: 'https://www.rarlab.com/rar/winrar-x64-621.exe', 
      icon: '📦',
      description: 'Powerful archiver and archive manager utility',
      category: 'Utility',
      size: '~3MB'
    },
    { 
      name: 'Epic Games', 
      url: 'https://launcher-public-service-prod06.ol.epicgames.com/launcher/api/installer/download/EpicGamesLauncherInstaller.msi', 
      icon: '🎯',
      description: 'Digital video game storefront and launcher',
      category: 'Gaming',
      size: '~65MB'
    },
    { 
      name: 'Visual Studio Code', 
      url: 'https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user', 
      icon: '💻',
      description: 'Lightweight but powerful source code editor',
      category: 'Development',
      size: '~90MB'
    },
    { 
      name: 'OBS Studio', 
      url: 'https://cdn-fastly.obsproject.com/downloads/OBS-Studio-30.0.2-Full-Installer-x64.exe', 
      icon: '📹',
      description: 'Free and open source streaming and recording software',
      category: 'Media',
      size: '~110MB'
    },
    { 
      name: 'Chrome', 
      url: 'https://dl.google.com/chrome/install/latest/chrome_installer.exe', 
      icon: '🌐',
      description: 'Fast, secure, and free web browser built for the modern web',
      category: 'Browser',
      size: '~1MB'
    },
    { 
      name: 'Malwarebytes', 
      url: 'https://data-cdn.mbamupdates.com/web/mb4-setup-consumer/offline/MBSetup.exe', 
      icon: '🛡️',
      description: 'Anti-malware software for comprehensive protection',
      category: 'Security',
      size: '~5MB'
    },
    { 
      name: 'Faceit AC', 
      url: 'https://cdn.faceit.com/faceit/anticheat/FaceitAC_1.0.17.36.exe', 
      icon: '⚔️',
      description: 'Anti-cheat software for competitive gaming platform',
      category: 'Gaming',
      size: '~15MB'
    },
    { 
      name: '7-Zip', 
      url: 'https://www.7-zip.org/a/7z2301-x64.exe', 
      icon: '🗜️',
      description: 'Free and open-source file archiver with high compression ratio',
      category: 'Utility',
      size: '~1.5MB'
    },
    { 
      name: 'Notepad++', 
      url: 'https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.5.8/npp.8.5.8.Installer.x64.exe', 
      icon: '📝',
      description: 'Free source code editor and Notepad replacement',
      category: 'Development',
      size: '~4MB'
    },
    { 
      name: 'Audacity', 
      url: 'https://github.com/audacity/audacity/releases/download/Audacity-3.4.2/audacity-win-3.4.2-x64.exe', 
      icon: '🎙️',
      description: 'Free, open source, cross-platform audio software',
      category: 'Media',
      size: '~30MB'
    },
    { 
      name: 'GIMP', 
      url: 'https://download.gimp.org/gimp/v2.10/windows/gimp-2.10.36-setup.exe', 
      icon: '🎨',
      description: 'GNU Image Manipulation Program - free image editor',
      category: 'Graphics',
      size: '~200MB'
    }
  ];

  const categories = ['All', ...new Set(apps.map(app => app.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredApps = selectedCategory === 'All' 
    ? apps 
    : apps.filter(app => app.category === selectedCategory);

  const handleDownload = async (app) => {
    try {
      setLoading(app.name);
      setStatus(`🔄 Downloading ${app.name}...`);
      showNotification('Info', `Starting download of ${app.name}`);
      
      const result = await invoke('download_and_run', { name: app.name, url: app.url });
      setStatus(`✅ ${result}`);
      showNotification('Success', `${app.name} downloaded and launched successfully!`);
    } catch (error) {
      const errorMsg = `❌ Error downloading ${app.name}: ${error}`;
      setStatus(errorMsg);
      showNotification('Error', `Failed to download ${app.name}: ${error}`);
    } finally {
      setLoading(null);
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
      background: rgba(0, 0, 0, 0.9);
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
          Application Downloads
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#a0a0a0' 
        }}>
          Download and install popular applications with one click
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div 
        variants={itemVariants}
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '8px 16px',
              background: selectedCategory === category ? accentColor : 'rgba(255, 255, 255, 0.05)',
              color: selectedCategory === category ? 'white' : '#a0a0a0',
              border: `1px solid ${selectedCategory === category ? accentColor : 'rgba(255, 255, 255, 0.1)'}`,
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      <motion.div 
        layout
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px',
          marginBottom: '24px'
        }}
      >
        <AnimatePresence>
          {filteredApps.map((app, index) => (
            <motion.div 
              key={app.name}
              layout
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{ 
                scale: 1.02,
                boxShadow: `0 8px 32px ${accentColor}33`
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
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
                background: accentColor
              }} />
              
              <div style={{
                fontSize: '48px',
                marginBottom: '16px',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
              }}>
                {app.icon}
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#ffffff',
                  margin: 0
                }}>
                  {app.name}
                </h3>
                <span style={{
                  fontSize: '12px',
                  color: accentColor,
                  background: `${accentColor}20`,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontWeight: '500'
                }}>
                  {app.category}
                </span>
              </div>
              
              <p style={{
                fontSize: '14px',
                color: '#a0a0a0',
                marginBottom: '12px',
                lineHeight: '1.4',
                minHeight: '40px'
              }}>
                {app.description}
              </p>
              
              <div style={{
                fontSize: '12px',
                color: '#666',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}>
                📦 {app.size}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDownload(app)}
                disabled={loading === app.name}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  background: loading === app.name ? 'rgba(139, 92, 246, 0.5)' : accentColor,
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: loading === app.name ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: loading === app.name ? 'none' : `0 4px 12px ${accentColor}44`
                }}
              >
                {loading === app.name ? (
                  <>
                    <FiRefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                    Downloading...
                  </>
                ) : (
                  <>
                    <FiDownload size={16} />
                    Download & Install
                  </>
                )}
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              padding: '16px 20px',
              borderRadius: '12px',
              background: status.includes('❌') 
                ? 'rgba(239, 68, 68, 0.1)' 
                : status.includes('✅') 
                  ? 'rgba(16, 185, 129, 0.1)'
                  : `${accentColor}20`,
              border: `1px solid ${
                status.includes('❌') 
                  ? 'rgba(239, 68, 68, 0.3)' 
                  : status.includes('✅') 
                    ? 'rgba(16, 185, 129, 0.3)'
                    : `${accentColor}66`
              }`,
              color: status.includes('❌') 
                ? '#ef4444' 
                : status.includes('✅') 
                  ? '#10b981'
                  : accentColor,
              fontSize: '14px',
              fontWeight: '500',
              textAlign: 'center'
            }}
          >
            {status}
          </motion.div>
        )}
      </AnimatePresence>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
          }
        `}
      </style>
    </motion.div>
  );
};

export default Apps;