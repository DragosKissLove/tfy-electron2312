import React, { useState, useEffect } from 'react';
import './App.css';
import { invoke } from '@tauri-apps/api/tauri';
import { FiMinus, FiX, FiMaximize2 } from 'react-icons/fi';
import { appWindow } from '@tauri-apps/api/window';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Apps from './pages/Apps';
import Tools from './pages/Tools';
import Gaming from './pages/Gaming';
import Updates from './pages/Updates';
import Settings from './pages/Settings';

const App = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
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

  const handleMinimize = () => {
    appWindow.minimize();
  };

  const handleMaximize = () => {
    appWindow.toggleMaximize();
  };

  const handleClose = () => {
    appWindow.close();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Apps':
        return <Apps />;
      case 'Tools':
        return <Tools />;
      case 'Gaming':
        return <Gaming />;
      case 'Updates':
        return <Updates />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      {/* Custom Title Bar */}
      <div className="titlebar" data-tauri-drag-region>
        <div className="titlebar-left">
          <div className="app-icon">
            <div className="icon-circle"></div>
          </div>
          <span className="app-title">TFY Tool</span>
        </div>
        <div className="titlebar-right">
          <button className="titlebar-button" onClick={handleMinimize}>
            <FiMinus size={14} />
          </button>
          <button className="titlebar-button" onClick={handleMaximize}>
            <FiMaximize2 size={14} />
          </button>
          <button className="titlebar-button close" onClick={handleClose}>
            <FiX size={14} />
          </button>
        </div>
      </div>

      <div className="app-content">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          username={username}
        />
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;