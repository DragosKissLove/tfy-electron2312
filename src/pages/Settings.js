import React, { useState, useEffect } from 'react';
import { FiInfo, FiMessageCircle } from 'react-icons/fi';
import { FaPalette } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { invoke } from '@tauri-apps/api/tauri';

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
    // Apply to CSS custom property
    document.documentElement.style.setProperty('--accent-color', color);
    
    // Apply to all elements with accent color
    const elements = document.querySelectorAll('[data-accent]');
    elements.forEach(el => {
      el.style.setProperty('--accent-color', color);
    });

    // Update button colors
    const buttons = document.querySelectorAll('.accent-button');
    buttons.forEach(button => {
      button.style.backgroundColor = color;
    });

    // Update border colors
    const borders = document.querySelectorAll('.accent-border');
    borders.forEach(border => {
      border.style.borderColor = color;
    });
  };

  const handleColorChange = (color) => {
    setAccentColor(color);
    localStorage.setItem('accentColor', color);
    applyAccentColor(color);
    
    // Force re-render of components
    window.dispatchEvent(new CustomEvent('accentColorChange', { detail: color }));
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
    { name: 'Indigo', color: '#6366f1' },
    { name: 'Emerald', color: '#059669' },
    { name: 'Rose', color: '#f43f5e' },
    { name: 'Amber', color: '#d97706' },
    { name: 'Teal', color: '#0d9488' }
  ];

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
          Settings
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
          Customize your TFY Tool experience
        </motion.p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Appearance Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '24px'
          }}
        >
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
            alignItems: 'flex-start',
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
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
              maxWidth: '200px'
            }}>
              {colorPresets.map((preset, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleColorChange(preset.color)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    border: accentColor === preset.color ? `3px solid ${preset.color}` : '2px solid rgba(255,255,255,0.2)',
                    backgroundColor: preset.color,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                    boxShadow: accentColor === preset.color ? `0 0 20px ${preset.color}66` : 'none'
                  }}
                  title={preset.name}
                >
                  {accentColor === preset.color && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '12px',
                        height: '12px',
                        backgroundColor: 'white',
                        borderRadius: '50%'
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* General Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '24px'
          }}
        >
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
            <motion.label 
              whileHover={{ scale: 1.05 }}
              style={{
                position: 'relative',
                display: 'inline-block',
                width: '50px',
                height: '28px',
                cursor: 'pointer'
              }}
            >
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
              <motion.span 
                animate={{
                  backgroundColor: autoStart ? accentColor : 'rgba(255, 255, 255, 0.2)'
                }}
                style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  transition: '0.3s',
                  borderRadius: '28px'
                }}
              >
                <motion.span 
                  animate={{
                    left: autoStart ? '24px' : '2px'
                  }}
                  style={{
                    position: 'absolute',
                    content: '""',
                    height: '24px',
                    width: '24px',
                    bottom: '2px',
                    backgroundColor: 'white',
                    transition: '0.3s',
                    borderRadius: '50%',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                />
              </motion.span>
            </motion.label>
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
            <motion.label 
              whileHover={{ scale: 1.05 }}
              style={{
                position: 'relative',
                display: 'inline-block',
                width: '50px',
                height: '28px',
                cursor: 'pointer'
              }}
            >
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
              <motion.span 
                animate={{
                  backgroundColor: notifications ? accentColor : 'rgba(255, 255, 255, 0.2)'
                }}
                style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  transition: '0.3s',
                  borderRadius: '28px'
                }}
              >
                <motion.span 
                  animate={{
                    left: notifications ? '24px' : '2px'
                  }}
                  style={{
                    position: 'absolute',
                    content: '""',
                    height: '24px',
                    width: '24px',
                    bottom: '2px',
                    backgroundColor: 'white',
                    transition: '0.3s',
                    borderRadius: '50%',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                />
              </motion.span>
            </motion.label>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '24px'
          }}
        >
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
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;