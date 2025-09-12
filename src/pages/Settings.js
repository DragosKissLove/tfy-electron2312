import React, { useState } from 'react';
import { FiPalette, FiInfo, FiMessageCircle } from 'react-icons/fi';

const Settings = () => {
  const [accentColor, setAccentColor] = useState('#8b5cf6');
  const [autoStart, setAutoStart] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleColorChange = (color) => {
    setAccentColor(color);
    document.documentElement.style.setProperty('--accent-color', color);
  };

  const openDiscord = () => {
    window.open('https://discord.gg/tfyexe', '_blank');
  };

  const colorPresets = [
    { name: 'Purple', color: '#8b5cf6' },
    { name: 'Blue', color: '#3b82f6' },
    { name: 'Green', color: '#10b981' },
    { name: 'Red', color: '#ef4444' },
    { name: 'Orange', color: '#f59e0b' },
    { name: 'Pink', color: '#ec4899' },
  ];

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Customize your TFY Tool experience</p>
      </div>

      <div className="settings-sections">
        {/* Appearance Section */}
        <div className="section card">
          <div className="section-header">
            <FiPalette size={20} />
            <h3>Appearance</h3>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <label>Accent Color</label>
              <p>Choose your preferred accent color</p>
            </div>
            <div className="color-picker">
              <div className="color-presets">
                {colorPresets.map((preset, index) => (
                  <button
                    key={index}
                    className={`color-preset ${accentColor === preset.color ? 'active' : ''}`}
                    style={{ backgroundColor: preset.color }}
                    onClick={() => handleColorChange(preset.color)}
                    title={preset.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* General Section */}
        <div className="section card">
          <div className="section-header">
            <FiInfo size={20} />
            <h3>General</h3>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <label>Auto Start</label>
              <p>Launch TFY Tool when Windows starts</p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={autoStart}
                onChange={(e) => setAutoStart(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <label>Notifications</label>
              <p>Show notifications for completed tasks</p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        {/* About Section */}
        <div className="section card">
          <div className="section-header">
            <FiInfo size={20} />
            <h3>About</h3>
          </div>
          
          <div className="about-content">
            <div className="app-info">
              <h4>TFY Tool</h4>
              <p>Version 3.0.0</p>
              <p>Your all-in-one system optimization tool</p>
            </div>
            
            <button className="button secondary" onClick={openDiscord}>
              <FiMessageCircle size={16} />
              Join Discord
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .settings-sections {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          color: #8b5cf6;
        }

        .section-header h3 {
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
        }

        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #3d3d3d;
        }

        .setting-item:last-child {
          border-bottom: none;
        }

        .setting-info label {
          font-size: 16px;
          font-weight: 500;
          color: #ffffff;
          display: block;
          margin-bottom: 4px;
        }

        .setting-info p {
          font-size: 14px;
          color: #a0a0a0;
        }

        .color-presets {
          display: flex;
          gap: 8px;
        }

        .color-preset {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
        }

        .color-preset:hover {
          transform: scale(1.1);
        }

        .color-preset.active {
          border-color: #ffffff;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
        }

        .about-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .app-info h4 {
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .app-info p {
          font-size: 14px;
          color: #a0a0a0;
          margin-bottom: 2px;
        }

        @media (max-width: 768px) {
          .setting-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .about-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Settings;