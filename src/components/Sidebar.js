import React from 'react';
import { 
  FiHome, 
  FiDownload, 
  FiTool, 
  FiGamepad, 
  FiRefreshCw, 
  FiSettings,
  FiUser
} from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab, username }) => {
  const menuItems = [
    { id: 'Dashboard', icon: FiHome, label: 'Dashboard' },
    { id: 'Apps', icon: FiDownload, label: 'Downloads' },
    { id: 'Tools', icon: FiTool, label: 'Tweaks' },
    { id: 'Gaming', icon: FiGamepad, label: 'Gaming Tweaks' },
    { id: 'Updates', icon: FiRefreshCw, label: 'Updates' },
    { id: 'Settings', icon: FiSettings, label: 'Settings' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="user-info">
          <div className="user-avatar">
            <FiUser size={16} />
          </div>
          <span className="username">{username}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="version">v3.0.0</div>
      </div>
    </div>
  );
};

export default Sidebar;