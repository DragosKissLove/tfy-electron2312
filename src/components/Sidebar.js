import React, { useState, useEffect } from 'react';
import { 
  FiHome, 
  FiDownload, 
  FiTool, 
  FiRefreshCw, 
  FiSettings,
  FiUser
} from 'react-icons/fi';
import { FaGamepad } from 'react-icons/fa';
import { invoke } from '@tauri-apps/api/tauri';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [username, setUsername] = useState('User');

  useEffect(() => {
    const getUsername = async () => {
      try {
        const name = await invoke('get_username');
        setUsername(name);
      } catch (error) {
        console.error('Failed to get username:', error);
      }
    };
    getUsername();
  }, []);

  const menuItems = [
    { id: 'Dashboard', icon: FiHome, label: 'Dashboard' },
    { id: 'Apps', icon: FiDownload, label: 'Downloads' },
    { id: 'Tools', icon: FiTool, label: 'Tweaks' },
    { id: 'Gaming', icon: FaGamepad, label: 'Gaming Tweaks' },
    { id: 'Updates', icon: FiRefreshCw, label: 'Updates' },
    { id: 'Settings', icon: FiSettings, label: 'Settings' },
  ];

  return (
    <div style={{
      width: '240px',
      background: 'rgba(255, 255, 255, 0.03)',
      borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <div style={{
        padding: '20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <FiUser size={16} />
          </div>
          <span style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#ffffff'
          }}>
            {username}
          </span>
        </div>
      </div>

      <nav style={{
        flex: 1,
        padding: '20px 0'
      }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              width: '100%',
              background: activeTab === item.id ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
              border: 'none',
              color: activeTab === item.id ? '#8b5cf6' : '#a0a0a0',
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s',
              textAlign: 'left',
              borderRight: activeTab === item.id ? '2px solid #8b5cf6' : '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== item.id) {
                e.target.style.background = 'rgba(139, 92, 246, 0.1)';
                e.target.style.color = '#8b5cf6';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== item.id) {
                e.target.style.background = 'transparent';
                e.target.style.color = '#a0a0a0';
              }
            }}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div style={{
        padding: '20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          fontSize: '12px',
          color: '#666',
          textAlign: 'center'
        }}>
          v3.0.0
        </div>
      </div>
    </div>
  );
};

export default Sidebar;