import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { FiDownload, FiClock, FiRefreshCw } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Gaming = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(null);
  const [robloxVersion, setRobloxVersion] = useState('');
  const [versions, setVersions] = useState([]);
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

    // Load Roblox versions
    const robloxVersions = [
      { version: '2024.01.15', hash: 'version-4a5c6b7d8e9f0a1b2c3d4e5f6a7b8c9d' },
      { version: '2023.12.20', hash: 'version-1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d' },
      { version: '2023.11.25', hash: 'version-9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c' },
      { version: '2023.10.30', hash: 'version-8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b' },
      { version: '2023.09.28', hash: 'version-7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a' },
      { version: '2023.08.25', hash: 'version-6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a19' },
      { version: '2023.07.20', hash: 'version-5b4a3f2e1d0c9b8a7f6e5d4c3b2a1908' },
      { version: '2023.06.15', hash: 'version-4a3f2e1d0c9b8a7f6e5d4c3b2a190817' }
    ];
    setVersions(robloxVersions);

    return () => {
      window.removeEventListener('accentColorChange', handleColorChange);
    };
  }, []);

  const executors = [
    {
      name: 'Swift',
      url: 'https://raw.githubusercontent.com/DragosKissLove/tfy-electron2312/master/src/utils/Swift.exe',
      description: 'Fast and reliable Roblox executor with advanced features',
      status: 'Available'
    },
    {
      name: 'Solara',
      url: 'https://raw.githubusercontent.com/DragosKissLove/tfy-electron2312/master/src/utils/BootstrapperNew.exe',
      description: 'Advanced Roblox script executor with premium capabilities',
      status: 'Available'
    },
    {
      name: 'Velocity',
      url: '',
      description: 'Next-generation executor with enhanced performance',
      status: 'Coming Soon'
    }
  ];

  const handleRobloxDowngrade = async () => {
    if (!robloxVersion.trim()) {
      setStatus('❌ Please enter a version hash');
      showNotification('Error', 'Please select or enter a version hash');
      return;
    }

    try {
      setLoading('roblox');
      setStatus('🔄 Starting Roblox downgrade process...');
      showNotification('Info', 'Starting Roblox downgrade...');
      
      const result = await invoke('download_roblox_player', { versionHash: robloxVersion });
      setStatus(`✅ ${result}`);
      showNotification('Success', 'Roblox downgrade completed successfully!');
    } catch (error) {
      const errorMsg = `❌ Error downloading Roblox: ${error}`;
      setStatus(errorMsg);
      showNotification('Error', `Roblox downgrade failed: ${error}`);
    } finally {
      setLoading(null);
    }
  };

  const handleExecutorDownload = async (executor) => {
    if (executor.status === 'Coming Soon') {
      showNotification('Info', `${executor.name} is coming soon!`);
      return;
    }

    try {
      setLoading(executor.name);
      setStatus(`🔄 Downloading ${executor.name}...`);
      showNotification('Info', `Downloading ${executor.name}...`);
      
      const result = await invoke('download_and_run', { name: executor.name, url: executor.url });
      setStatus(`✅ ${result}`);
      showNotification('Success', `${executor.name} downloaded and launched successfully!`);
    } catch (error) {
      const errorMsg = `❌ Error downloading ${executor.name}: ${error}`;
      setStatus(errorMsg);
      showNotification('Error', `Failed to download ${executor.name}: ${error}`);
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '24px', height: '100vh', overflow: 'auto' }}
    >
      <div style={{ marginBottom: '32px' }}>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ 
            fontSize: '28px', 
            fontWeight: '600', 
            color: '#ffffff', 
            marginBottom: '8px' 
          }}
        >
          Gaming Tweaks
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          style={{ 
            fontSize: '16px', 
            color: '#a0a0a0' 
          }}
        >
          Gaming optimization tools and Roblox utilities
        </motion.p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Roblox Downgrade Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
            color: '#ffffff',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🎮 Roblox Downgrade
          </h3>
          <p style={{ 
            fontSize: '14px',
            color: '#a0a0a0',
            marginBottom: '20px'
          }}>
            Downgrade Roblox to a specific version for compatibility with older exploits
          </p>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ 
              fontSize: '16px',
              fontWeight: '500',
              color: '#ffffff',
              marginBottom: '12px'
            }}>
              📋 Available Versions:
            </h4>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '8px',
              maxHeight: '200px',
              overflowY: 'auto',
              padding: '8px',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              {versions.map((v, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 12px',
                    background: robloxVersion === v.hash ? `${accentColor}33` : 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    border: robloxVersion === v.hash ? `1px solid ${accentColor}` : '1px solid transparent',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setRobloxVersion(v.hash)}
                  whileHover={{ 
                    scale: 1.02,
                    background: robloxVersion === v.hash ? `${accentColor}44` : 'rgba(255, 255, 255, 0.1)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span style={{ 
                    color: '#ffffff',
                    fontWeight: '500'
                  }}>
                    📅 {v.version}
                  </span>
                  <span style={{ 
                    color: '#a0a0a0',
                    fontFamily: 'monospace',
                    fontSize: '10px'
                  }}>
                    {v.hash.replace('version-', '').substring(0, 8)}...
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            <input
              type="text"
              placeholder="Select a version above or enter custom hash..."
              value={robloxVersion}
              onChange={(e) => setRobloxVersion(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${robloxVersion ? accentColor : 'rgba(255, 255, 255, 0.2)'}`,
                borderRadius: '8px',
                padding: '12px 16px',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s'
              }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRobloxDowngrade}
              disabled={loading === 'roblox'}
              style={{
                padding: '12px 24px',
                background: loading === 'roblox' ? 'rgba(139, 92, 246, 0.5)' : accentColor,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: loading === 'roblox' ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                minWidth: '140px',
                justifyContent: 'center'
              }}
            >
              {loading === 'roblox' ? (
                <>
                  <FiRefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  Downloading...
                </>
              ) : (
                <>
                  <FiDownload size={16} />
                  Downgrade
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Executors Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
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
            color: '#ffffff',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            ⚡ Script Executors
          </h3>
          <p style={{ 
            fontSize: '14px',
            color: '#a0a0a0',
            marginBottom: '20px'
          }}>
            Download and use popular Roblox script executors
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px'
          }}>
            {executors.map((executor, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {executor.status === 'Available' && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: '#10b981',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}>
                    ✓ AVAILABLE
                  </div>
                )}
                
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#ffffff',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  🚀 {executor.name}
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#a0a0a0',
                  flex: 1,
                  margin: 0,
                  lineHeight: '1.4'
                }}>
                  {executor.description}
                </p>
                <motion.button
                  whileHover={{ scale: executor.status === 'Available' ? 1.02 : 1 }}
                  whileTap={{ scale: executor.status === 'Available' ? 0.98 : 1 }}
                  onClick={() => handleExecutorDownload(executor)}
                  disabled={loading === executor.name || executor.status === 'Coming Soon'}
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    background: executor.status === 'Coming Soon' 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : loading === executor.name 
                        ? 'rgba(139, 92, 246, 0.5)' 
                        : accentColor,
                    color: executor.status === 'Coming Soon' ? '#a0a0a0' : 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: executor.status === 'Coming Soon' || loading === executor.name ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {loading === executor.name ? (
                    <>
                      <FiRefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                      Downloading...
                    </>
                  ) : executor.status === 'Coming Soon' ? (
                    <>
                      <FiClock size={16} />
                      Coming Soon
                    </>
                  ) : (
                    <>
                      <FiDownload size={16} />
                      Download {executor.name}
                    </>
                  )}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              marginTop: '20px',
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
              fontWeight: '500'
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

export default Gaming;