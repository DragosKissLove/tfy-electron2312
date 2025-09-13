import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { FiDownload, FiClock } from 'react-icons/fi';

const Gaming = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(null);
  const [robloxVersion, setRobloxVersion] = useState('');
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    // Load versions from a local array since we can't fetch in Tauri easily
    setVersions([
      { version: '2023.12.15', hash: '4a5c6b7d8e9f0a1b2c3d4e5f6a7b8c9d' },
      { version: '2023.11.20', hash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d' },
      { version: '2023.10.25', hash: '9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c' },
      { version: '2023.09.30', hash: '8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b' },
      { version: '2023.08.28', hash: '7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a' }
    ]);
  }, []);

  const executors = [
    {
      name: 'Swift',
      url: 'https://raw.githubusercontent.com/DragosKissLove/tfy-electron2312/master/src/utils/Swift.exe',
      description: 'Fast and reliable Roblox executor'
    },
    {
      name: 'Solara',
      url: 'https://raw.githubusercontent.com/DragosKissLove/tfy-electron2312/master/src/utils/BootstrapperNew.exe',
      description: 'Advanced Roblox script executor'
    }
  ];

  const handleRobloxDowngrade = async () => {
    if (!robloxVersion.trim()) {
      setStatus('Please enter a version hash');
      return;
    }

    try {
      setLoading('roblox');
      setStatus('Downloading Roblox player...');
      const result = await invoke('download_roblox_player', { versionHash: robloxVersion });
      setStatus(result);
    } catch (error) {
      setStatus(`Error downloading Roblox: ${error}`);
    } finally {
      setLoading(null);
    }
  };

  const handleExecutorDownload = async (executor) => {
    try {
      setLoading(executor.name);
      setStatus(`Downloading ${executor.name}...`);
      const result = await invoke('download_and_run', { name: executor.name, url: executor.url });
      setStatus(result);
    } catch (error) {
      setStatus(`Error downloading ${executor.name}: ${error}`);
    } finally {
      setLoading(null);
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
          Gaming Tweaks
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#a0a0a0' 
        }}>
          Gaming optimization tools and utilities
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Roblox Downgrade Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{ 
            fontSize: '20px',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '8px'
          }}>
            Roblox Downgrade
          </h3>
          <p style={{ 
            fontSize: '14px',
            color: '#a0a0a0',
            marginBottom: '20px'
          }}>
            Downgrade Roblox to a specific version for compatibility with older exploits
          </p>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ 
              fontSize: '16px',
              fontWeight: '500',
              color: '#ffffff',
              marginBottom: '12px'
            }}>
              Available Versions:
            </h4>
            <div style={{ 
              display: 'grid',
              gap: '8px',
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              {versions.map((v, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '6px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
                onClick={() => setRobloxVersion(v.hash)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}>
                  <span style={{ 
                    color: '#ffffff',
                    fontWeight: '500'
                  }}>
                    {v.version}
                  </span>
                  <span style={{ 
                    color: '#a0a0a0',
                    fontFamily: 'monospace'
                  }}>
                    {v.hash}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            <input
              type="text"
              placeholder="Enter version hash or click on a version above"
              value={robloxVersion}
              onChange={(e) => setRobloxVersion(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '12px 16px',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            />
            <button
              onClick={handleRobloxDowngrade}
              disabled={loading === 'roblox'}
              style={{
                padding: '12px 24px',
                background: loading === 'roblox' ? 'rgba(139, 92, 246, 0.5)' : '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: loading === 'roblox' ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {loading === 'roblox' ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid transparent',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Downloading...
                </>
              ) : (
                <>
                  <FiDownload size={16} />
                  Downgrade
                </>
              )}
            </button>
          </div>
        </div>

        {/* Executors Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{ 
            fontSize: '20px',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '8px'
          }}>
            Executors
          </h3>
          <p style={{ 
            fontSize: '14px',
            color: '#a0a0a0',
            marginBottom: '20px'
          }}>
            Download popular Roblox script executors
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            {executors.map((executor, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#ffffff',
                  margin: 0
                }}>
                  {executor.name}
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#a0a0a0',
                  flex: 1,
                  margin: 0
                }}>
                  {executor.description}
                </p>
                <button
                  onClick={() => handleExecutorDownload(executor)}
                  disabled={loading === executor.name}
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    background: loading === executor.name ? 'rgba(139, 92, 246, 0.5)' : '#8b5cf6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: loading === executor.name ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {loading === executor.name ? (
                    <>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid transparent',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <FiDownload size={16} />
                      Download
                    </>
                  )}
                </button>
              </div>
            ))}
            
            {/* Coming Soon Executor */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              opacity: 0.6
            }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#ffffff',
                margin: 0
              }}>
                Velocity
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#a0a0a0',
                flex: 1,
                margin: 0
              }}>
                Advanced executor with enhanced features
              </p>
              <button
                disabled
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#a0a0a0',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <FiClock size={16} />
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>

      {status && (
        <div style={{
          marginTop: '20px',
          padding: '16px',
          borderRadius: '8px',
          background: status.includes('Error') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
          border: `1px solid ${status.includes('Error') ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
          color: status.includes('Error') ? '#ef4444' : '#10b981',
          fontSize: '14px'
        }}>
          {status}
        </div>
      )}

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

export default Gaming;