import React, { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { FiDownload } from 'react-icons/fi';

const Gaming = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(null);
  const [robloxVersion, setRobloxVersion] = useState('');

  const versions = [
    { version: '2023.12.15', hash: '4a5c6b7d8e9f0a1b2c3d4e5f6a7b8c9d' },
    { version: '2023.11.20', hash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d' },
    { version: '2023.10.25', hash: '9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c' },
  ];

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
    <div className="gaming-page">
      <div className="page-header">
        <h1 className="page-title">Gaming Tweaks</h1>
        <p className="page-subtitle">Gaming optimization tools and utilities</p>
      </div>

      <div className="gaming-sections">
        {/* Roblox Downgrade Section */}
        <div className="section card">
          <h3>Roblox Downgrade</h3>
          <p className="section-description">
            Downgrade Roblox to a specific version for compatibility with older exploits
          </p>
          
          <div className="versions-list">
            <h4>Available Versions:</h4>
            {versions.map((v, index) => (
              <div key={index} className="version-item">
                <span className="version-name">{v.version}</span>
                <span className="version-hash">{v.hash}</span>
              </div>
            ))}
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Enter version hash"
              value={robloxVersion}
              onChange={(e) => setRobloxVersion(e.target.value)}
              className="version-input"
            />
            <button
              className={`button ${loading === 'roblox' ? 'loading' : ''}`}
              onClick={handleRobloxDowngrade}
              disabled={loading === 'roblox'}
            >
              {loading === 'roblox' ? (
                <>
                  <div className="loading"></div>
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
        <div className="section card">
          <h3>Executors</h3>
          <p className="section-description">
            Download popular Roblox script executors
          </p>
          
          <div className="executors-grid grid grid-2">
            {executors.map((executor, index) => (
              <div key={index} className="executor-card">
                <h4>{executor.name}</h4>
                <p>{executor.description}</p>
                <button
                  className={`button ${loading === executor.name ? 'loading' : ''}`}
                  onClick={() => handleExecutorDownload(executor)}
                  disabled={loading === executor.name}
                >
                  {loading === executor.name ? (
                    <>
                      <div className="loading"></div>
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
          </div>
        </div>
      </div>

      {status && (
        <div className={`status-message ${status.includes('Error') ? 'error' : 'success'}`}>
          {status}
        </div>
      )}

      <style jsx>{`
        .gaming-sections {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 24px;
        }

        .section h3 {
          font-size: 20px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .section-description {
          font-size: 14px;
          color: #a0a0a0;
          margin-bottom: 20px;
        }

        .versions-list {
          margin-bottom: 20px;
        }

        .versions-list h4 {
          font-size: 16px;
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .version-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: #3d3d3d;
          border-radius: 6px;
          margin-bottom: 8px;
          font-size: 12px;
        }

        .version-name {
          color: #ffffff;
          font-weight: 500;
        }

        .version-hash {
          color: #a0a0a0;
          font-family: monospace;
        }

        .input-group {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .version-input {
          flex: 1;
          background: #3d3d3d;
          border: 1px solid #4d4d4d;
          border-radius: 8px;
          padding: 12px 16px;
          color: #ffffff;
          font-size: 14px;
        }

        .version-input:focus {
          outline: none;
          border-color: #8b5cf6;
        }

        .version-input::placeholder {
          color: #666;
        }

        .executors-grid {
          gap: 16px;
        }

        .executor-card {
          background: #3d3d3d;
          border-radius: 8px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .executor-card h4 {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
        }

        .executor-card p {
          font-size: 14px;
          color: #a0a0a0;
          flex: 1;
        }

        .executor-card .button {
          width: 100%;
          justify-content: center;
        }

        .button.loading {
          opacity: 0.7;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .input-group {
            flex-direction: column;
          }
          
          .version-input {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Gaming;