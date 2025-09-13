import React, { useState, useEffect } from 'react';
import { FiDownload, FiTool, FiActivity } from 'react-icons/fi';
import { FaGamepad } from 'react-icons/fa';
import { invoke } from '@tauri-apps/api/tauri';

const Dashboard = () => {
  const [systemInfo, setSystemInfo] = useState({
    os: 'Loading...',
    ram: 'Loading...',
    cpu: 'Loading...',
    gpu: 'Loading...'
  });

  useEffect(() => {
    const getSystemInfo = async () => {
      try {
        const info = await invoke('get_system_info');
        setSystemInfo(info);
      } catch (error) {
        console.error('Failed to get system info:', error);
        setSystemInfo({
          os: 'Windows 11',
          ram: '16GB',
          cpu: 'Intel Core i7',
          gpu: 'NVIDIA GeForce RTX'
        });
      }
    };
    getSystemInfo();
  }, []);

  const quickActions = [
    {
      title: 'Clean Temp Files',
      description: 'Remove temporary files to free up space',
      icon: FiTool,
      action: 'clean_temp',
      color: '#10b981'
    },
    {
      title: 'System Optimization',
      description: 'Optimize your system for better performance',
      icon: FiActivity,
      action: 'run_optimization',
      color: '#3b82f6'
    },
    {
      title: 'Gaming Tweaks',
      description: 'Apply gaming optimizations',
      icon: FaGamepad,
      action: 'gaming_tweaks',
      color: '#8b5cf6'
    },
    {
      title: 'Download Apps',
      description: 'Install popular applications',
      icon: FiDownload,
      action: 'download_apps',
      color: '#f59e0b'
    }
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
          Dashboard
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#a0a0a0' 
        }}>
          Welcome to TFY Tool - Your system optimization hub
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '24px',
        marginBottom: '24px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '16px',
            color: '#ffffff'
          }}>
            System Information
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {[
              { label: 'Operating System', value: systemInfo.os },
              { label: 'Memory', value: systemInfo.ram },
              { label: 'Processor', value: systemInfo.cpu },
              { label: 'Graphics Card', value: systemInfo.gpu }
            ].map((stat, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: index < 3 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: '#a0a0a0'
                }}>
                  {stat.label}
                </span>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#ffffff'
                }}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '16px',
            color: '#ffffff'
          }}>
            Quick Actions
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px'
          }}>
            {quickActions.map((action, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
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
                <div>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: '4px'
                  }}>
                    {action.title}
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#a0a0a0',
                    lineHeight: '1.4',
                    margin: 0
                  }}>
                    {action.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .dashboard-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;