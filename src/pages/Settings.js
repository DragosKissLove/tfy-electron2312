import React, { useState, useEffect } from 'react';
import { FiInfo, FiMessageCircle } from 'react-icons/fi';
import { FaPalette } from 'react-icons/fa';

const Settings = () => {
  const [accentColor, setAccentColor] = useState('#8b5cf6');
  const [autoStart, setAutoStart] = useState(false);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    // Load saved accent color
    const savedColor = localStorage.getItem('accentColor');
    if (savedColor) {
      setAccentColor(savedColor);
      applyAccentColor(savedColor);
    }
  }, []);

  const applyAccentColor = (color) => {
    document.documentElement.style.setProperty('--accent-color', color);
    // Apply to all buttons and accent elements
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      if (button.style.background === '#8b5cf6' || button.style.background.includes('139, 92, 246')) {
        button.style.background = color;
      }
    });
  };

  const handleColorChange = (color) => {
    setAccentColor(color);
    localStorage.setItem('accentColor', color);
    applyAccentColor(color);
  };

  const openDiscord = () => {
    if (window.__TAURI__) {
      window.__TAURI__.shell.open('https://discord.gg/tfyexe');
    } else {
      window.open('https://discord.gg/tfyexe', '_blank');
    }
  };

  const colorPresets = [
    { name: 'Purple', color: '#8b5cf6' },
    { name: 'Blue', color: '#3b82f6' },
    { name: 'Green', color: '#10b981' },
    { name: 'Red', color: '#ef4444' },
    { name: 'Orange', color: '#f59e0b' },
    { name: 'Pink', color: '#ec4899' },
    { name: 'Cyan', color: '#06b6d4' },
    { name: 'Indigo', color: '#6366f1' }
  ];

  return (
    <div style={{ padding: '24px', height: '100vh', overflow: 'auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '600', 
          color: '#ffffff', 
          marginBottom: '8px' 
        }}>
          Settings
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#a0a0a0' 
        }}>
          Customize your TFY Tool experience
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Appearance Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            color: accentColor
          }}>
            <FaPalette size={20} />
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#ffffff',
              margin: 0
            }}>
              Appearance
            </h3>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '16px'
          }}>
            <div>
              <label style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#ffffff',
                display: 'block',
                marginBottom: '4px'
              }}>
                Accent Color
              </label>
              <p style={{
                fontSize: '14px',
                color: '#a0a0a0',
                margin: 0
              }}>
                Choose your preferred accent color
              </p>
            </div>
            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              {colorPresets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => handleColorChange(preset.color)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: accentColor === preset.color ? '2px solid #ffffff' : '2px solid transparent',
                    backgroundColor: preset.color,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: accentColor === preset.color ? '0 0 0 2px rgba(255, 255, 255, 0.3)' : 'none'
                  }}
                  title={preset.name}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* General Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            color: accentColor
          }}>
            <FiInfo size={20} />
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#ffffff',
              margin: 0
            }}>
              General
            </h3>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div>
              <label style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#ffffff',
                display: 'block',
                marginBottom: '4px'
              }}>
                Auto Start
              </label>
              <p style={{
                fontSize: '14px',
                color: '#a0a0a0',
                margin: 0
              }}>
                Launch TFY Tool when Windows starts
              </p>
            </div>
            <label style={{
              position: 'relative',
              display: 'inline-block',
              width: '44px',
              height: '24px'
            }}>
              <input
                type="checkbox"
                checked={autoStart}
                onChange={(e) => setAutoStart(e.target.checked)}
                style={{
                  opacity: 0,
                  width: 0,
                  height: 0
                }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: autoStart ? accentColor : 'rgba(255, 255, 255, 0.2)',
                transition: '0.2s',
                borderRadius: '24px'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '""',
                  height: '18px',
                  width: '18px',
                  left: autoStart ? '23px' : '3px',
                  bottom: '3px',
                  backgroundColor: 'white',
                  transition: '0.2s',
                  borderRadius: '50%'
                }}></span>
              </span>
            </label>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 0'
          }}>
            <div>
              <label style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#ffffff',
                display: 'block',
                marginBottom: '4px'
              }}>
                Notifications
              </label>
              <p style={{
                fontSize: '14px',
                color: '#a0a0a0',
                margin: 0
              }}>
                Show notifications for completed tasks
              </p>
            </div>
            <label style={{
              position: 'relative',
              display: 'inline-block',
              width: '44px',
              height: '24px'
            }}>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                style={{
                  opacity: 0,
                  width: 0,
                  height: 0
                }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: notifications ? accentColor : 'rgba(255, 255, 255, 0.2)',
                transition: '0.2s',
                borderRadius: '24px'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '""',
                  height: '18px',
                  width: '18px',
                  left: notifications ? '23px' : '3px',
                  bottom: '3px',
                  backgroundColor: 'white',
                  transition: '0.2s',
                  borderRadius: '50%'
                }}></span>
              </span>
            </label>
          </div>
        </div>

        {/* About Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            color: accentColor
          }}>
            <FiInfo size={20} />
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#ffffff',
              margin: 0
            }}>
              About
            </h3>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: '4px'
              }}>
                TFY Tool
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#a0a0a0',
                marginBottom: '2px'
              }}>
                Version 3.0.0
              </p>
              <p style={{
                fontSize: '14px',
                color: '#a0a0a0',
                marginBottom: '0'
              }}>
                Your all-in-one system optimization tool
              </p>
            </div>
            
            <button
              onClick={openDiscord}
              style={{
                padding: '12px 24px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#ffffff',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
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
              <FiMessageCircle size={16} style={{ color: accentColor }} />
              Join Discord
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;