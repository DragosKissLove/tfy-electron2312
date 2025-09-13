import React, { useState } from 'react';
import { FiRefreshCw, FiCheck } from 'react-icons/fi';

const Updates = () => {
  const [updateStatus, setUpdateStatus] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckUpdates = async () => {
    setIsChecking(true);
    setUpdateStatus('Checking for updates...');
    
    try {
      // Simulate checking for updates
      await new Promise(resolve => setTimeout(resolve, 2000));
      setUpdateStatus('You are running the latest version of TFY Tool!');
    } catch (error) {
      setUpdateStatus('Failed to check for updates. Please try again later.');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div style={{ padding: '24px', height: '100vh', overflow: 'auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '600', 
          color: '#ffffff', 
          marginBottom: '8px' 
        }}>
          Updates
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#a0a0a0' 
        }}>
          Keep your TFY Tool up to date
        </p>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '12px'
          }}>
            Current Version
          </h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <span style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#8b5cf6'
            }}>
              v3.0.0
            </span>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(16, 185, 129, 0.1)',
              color: '#10b981',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              <FiCheck size={16} />
              Latest
            </span>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={handleCheckUpdates}
            disabled={isChecking}
            style={{
              padding: '12px 24px',
              background: isChecking ? 'rgba(139, 92, 246, 0.5)' : '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: isChecking ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FiRefreshCw 
              size={16} 
              style={{ 
                animation: isChecking ? 'spin 1s linear infinite' : 'none'
              }} 
            />
            {isChecking ? 'Checking...' : 'Check for Updates'}
          </button>
        </div>

        {updateStatus && (
          <div style={{
            padding: '16px',
            borderRadius: '8px',
            background: updateStatus.includes('latest') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
            border: `1px solid ${updateStatus.includes('latest') ? 'rgba(16, 185, 129, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`,
            color: updateStatus.includes('latest') ? '#10b981' : '#3b82f6',
            fontSize: '14px'
          }}>
            {updateStatus}
          </div>
        )}
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#ffffff',
          marginBottom: '16px'
        }}>
          What's New in v3.0.0
        </h3>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {[
            'Complete UI redesign with modern dark theme',
            'Native desktop application (no more WebView2)',
            'Improved performance and reduced memory usage',
            'New gaming tweaks section',
            'Enhanced system optimization tools',
            'Better error handling and user feedback'
          ].map((item, index) => (
            <li key={index} style={{
              padding: '8px 0',
              color: '#a0a0a0',
              fontSize: '14px',
              position: 'relative',
              paddingLeft: '20px'
            }}>
              <span style={{
                content: '•',
                color: '#8b5cf6',
                fontWeight: 'bold',
                position: 'absolute',
                left: 0
              }}>
                •
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Updates;