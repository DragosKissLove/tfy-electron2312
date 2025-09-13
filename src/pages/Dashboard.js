import React, { useState, useEffect } from 'react';
import { FiDownload, FiTool, FiActivity } from 'react-icons/fi';
import { FaGamepad } from 'react-icons/fa';
import { FaGamepad } from 'react-icons/fa';

const Dashboard = () => {
  const [systemInfo, setSystemInfo] = useState({
    os: 'Windows 11',
    ram: '16GB',
    cpu: 'Intel Core i7',
  });

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
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome to TFY Tool - Your system optimization hub</p>
      </div>

      <div className="dashboard-grid">
        <div className="system-info-card card">
          <h3>System Information</h3>
          <div className="system-stats">
            <div className="stat">
              <span className="stat-label">Operating System</span>
              <span className="stat-value">{systemInfo.os}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Memory</span>
              <span className="stat-value">{systemInfo.ram}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Processor</span>
              <span className="stat-value">{systemInfo.cpu}</span>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="grid grid-2">
            {quickActions.map((action, index) => (
              <div key={index} className="action-card card">
                <div className="action-icon" style={{ color: action.color }}>
                  <action.icon size={24} />
                </div>
                <div className="action-content">
                  <h4>{action.title}</h4>
                  <p>{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        .system-info-card h3,
        .quick-actions h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #ffffff;
        }

        .system-stats {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .stat {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #3d3d3d;
        }

        .stat:last-child {
          border-bottom: none;
        }

        .stat-label {
          font-size: 14px;
          color: #a0a0a0;
        }

        .stat-value {
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
        }

        .action-card {
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-card:hover {
          transform: translateY(-2px);
        }

        .action-icon {
          width: 48px;
          height: 48px;
          background: rgba(139, 92, 246, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .action-content h4 {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .action-content p {
          font-size: 14px;
          color: #a0a0a0;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;