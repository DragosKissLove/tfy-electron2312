import React, { useState } from 'react';
import { FiRefreshCw, FiDownload, FiCheck } from 'react-icons/fi';

const Updates = () => {
  const [updateStatus, setUpdateStatus] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckUpdates = async () => {
    setIsChecking(true);
    setUpdateStatus('Checking for updates...');
    
    // Simulate update check
    setTimeout(() => {
      setUpdateStatus('You are running the latest version of TFY Tool!');
      setIsChecking(false);
    }, 2000);
  };

  return (
    <div className="updates-page">
      <div className="page-header">
        <h1 className="page-title">Updates</h1>
        <p className="page-subtitle">Keep your TFY Tool up to date</p>
      </div>

      <div className="update-section card">
        <div className="current-version">
          <h3>Current Version</h3>
          <div className="version-info">
            <span className="version-number">v3.0.0</span>
            <span className="version-status">
              <FiCheck size={16} />
              Latest
            </span>
          </div>
        </div>

        <div className="update-actions">
          <button
            className={`button ${isChecking ? 'loading' : ''}`}
            onClick={handleCheckUpdates}
            disabled={isChecking}
          >
            {isChecking ? (
              <>
                <div className="loading"></div>
                Checking...
              </>
            ) : (
              <>
                <FiRefreshCw size={16} />
                Check for Updates
              </>
            )}
          </button>
        </div>

        {updateStatus && (
          <div className={`status-message ${updateStatus.includes('latest') ? 'success' : 'info'}`}>
            {updateStatus}
          </div>
        )}
      </div>

      <div className="changelog card">
        <h3>What's New in v3.0.0</h3>
        <ul className="changelog-list">
          <li>Complete UI redesign with modern dark theme</li>
          <li>Native desktop application (no more WebView2)</li>
          <li>Improved performance and reduced memory usage</li>
          <li>New gaming tweaks section</li>
          <li>Enhanced system optimization tools</li>
          <li>Better error handling and user feedback</li>
        </ul>
      </div>

      <style jsx>{`
        .update-section {
          margin-bottom: 24px;
        }

        .current-version {
          margin-bottom: 24px;
        }

        .current-version h3 {
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .version-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .version-number {
          font-size: 24px;
          font-weight: 700;
          color: #8b5cf6;
        }

        .version-status {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }

        .update-actions {
          margin-bottom: 20px;
        }

        .changelog h3 {
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 16px;
        }

        .changelog-list {
          list-style: none;
          padding: 0;
        }

        .changelog-list li {
          padding: 8px 0;
          color: #a0a0a0;
          font-size: 14px;
          position: relative;
          padding-left: 20px;
        }

        .changelog-list li:before {
          content: '•';
          color: #8b5cf6;
          font-weight: bold;
          position: absolute;
          left: 0;
        }

        .button.loading {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default Updates;