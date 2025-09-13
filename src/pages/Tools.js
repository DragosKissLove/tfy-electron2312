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
    <div style={{ padding: '24px', height: '100vh', overflow: 'auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '600', 
          color: '#ffffff', 
          marginBottom: '8px' 
        }}>
          Tweaks
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#a0a0a0' 
        }}>
          System optimization and utility tools
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {tools.map((tool, index) => (
          <div key={index} style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
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
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: `${tool.color}20`,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <tool.icon size={24} color={tool.color} />
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#ffffff',
                margin: 0
              }}>
                {tool.name}
              </h3>
            </div>
            <p style={{
              fontSize: '14px',
              color: '#a0a0a0',
              lineHeight: '1.5',
              flex: 1,
              margin: 0
            }}>
              {tool.description}
            </p>
            <button
              onClick={() => handleRunTool(tool)}
              disabled={loading === tool.function}
              style={{
                width: '100%',
                padding: '12px 20px',
                background: loading === tool.function ? 'rgba(139, 92, 246, 0.5)' : '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: loading === tool.function ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: 'auto'
              }}
            >
              {loading === tool.function ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid transparent',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
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
        <div style={{
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

export default Tools;