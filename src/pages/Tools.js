import React, { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { FiTool, FiTrash2, FiZap, FiShield, FiKey, FiDownload } from 'react-icons/fi';

const Tools = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(null);

  const tools = [
    {
      name: 'Clean Temp Files',
      description: 'Remove temporary files to free up disk space',
      function: 'clean_temp',
      icon: FiTrash2,
      color: '#10b981'
    },
    {
      name: 'System Optimization',
      description: 'Apply system tweaks for better performance',
      function: 'run_optimization',
      icon: FiZap,
      color: '#3b82f6'
    },
    {
      name: 'Activate Windows',
      description: 'Activate Windows using official methods',
      function: 'activate_windows',
      icon: FiKey,
      color: '#f59e0b'
    },
    {
      name: 'WinRAR Crack',
      description: 'Apply WinRAR license key',
      function: 'winrar_crack',
      icon: FiTool,
      color: '#8b5cf6'
    },
    {
      name: 'WiFi Passwords',
      description: 'Show saved WiFi passwords',
      function: 'wifi_passwords',
      icon: FiShield,
      color: '#06b6d4'
    },
    {
      name: 'Atlas Tools',
      description: 'Download and install Atlas OS tools',
      function: 'install_atlas_tools',
      icon: FiDownload,
      color: '#ef4444'
    }
  ];

  const handleRunTool = async (tool) => {
    try {
      setLoading(tool.function);
      setStatus(`Running ${tool.name}...`);
      const result = await invoke('run_function', { name: tool.function });
      setStatus(result);
    } catch (error) {
      setStatus(`Error running ${tool.name}: ${error}`);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="tools-page">
      <div className="page-header">
        <h1 className="page-title">Tweaks</h1>
        <p className="page-subtitle">System optimization and utility tools</p>
      </div>

      <div className="tools-grid grid grid-3">
        {tools.map((tool, index) => (
          <div key={index} className="tool-card card">
            <div className="tool-header">
              <div className="tool-icon" style={{ color: tool.color }}>
                <tool.icon size={24} />
              </div>
              <h3 className="tool-name">{tool.name}</h3>
            </div>
            <p className="tool-description">{tool.description}</p>
            <button
              className={`button ${loading === tool.function ? 'loading' : ''}`}
              onClick={() => handleRunTool(tool)}
              disabled={loading === tool.function}
            >
              {loading === tool.function ? (
                <>
                  <div className="loading"></div>
                  Running...
                </>
              ) : (
                'Run Tool'
              )}
            </button>
          </div>
        ))}
      </div>

      {status && (
        <div className={`status-message ${status.includes('Error') ? 'error' : 'success'}`}>
          {status}
        </div>
      )}

      <style jsx>{`
        .tools-grid {
          margin-bottom: 24px;
        }

        .tool-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: all 0.2s;
        }

        .tool-card:hover {
          transform: translateY(-2px);
        }

        .tool-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .tool-icon {
          width: 40px;
          height: 40px;
          background: rgba(139, 92, 246, 0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .tool-name {
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
        }

        .tool-description {
          font-size: 14px;
          color: #a0a0a0;
          line-height: 1.5;
          flex: 1;
        }

        .tool-card .button {
          width: 100%;
          justify-content: center;
          margin-top: auto;
        }

        .button.loading {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default Tools;