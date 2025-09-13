import React, { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

const Apps = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(null);

  const apps = [
    { 
      name: 'Discord', 
      url: 'https://dl.discordapp.net/distro/app/stable/win/x86/1.0.9014/DiscordSetup.exe', 
      icon: '/icons/discord.png',
      description: 'Voice, video and text communication service'
    },
    { 
      name: 'Steam', 
      url: 'https://cdn.akamai.steamstatic.com/client/installer/SteamSetup.exe', 
      icon: '/icons/steam.png',
      description: 'Digital distribution platform for PC gaming'
    },
    { 
      name: 'Spotify', 
      url: 'https://download.scdn.co/SpotifySetup.exe', 
      icon: '/icons/spotify.png',
      description: 'Music streaming service'
    },
    { 
      name: 'Brave Browser', 
      url: 'https://laptop-updates.brave.com/latest/winx64', 
      icon: '/icons/brave.png',
      description: 'Privacy-focused web browser'
    },
    { 
      name: 'VLC Player', 
      url: 'https://get.videolan.org/vlc/3.0.20/win64/vlc-3.0.20-win64.exe', 
      icon: '/icons/vlc.png',
      description: 'Free and open source media player'
    },
    { 
      name: 'WinRAR', 
      url: 'https://www.rarlab.com/rar/winrar-x64-621.exe', 
      icon: '/icons/winrar.png',
      description: 'File archiver utility'
    },
    { 
      name: 'Epic Games', 
      url: 'https://launcher-public-service-prod06.ol.epicgames.com/launcher/api/installer/download/EpicGamesLauncherInstaller.msi', 
      icon: '/icons/epic.png',
      description: 'Digital video game storefront'
    },
    { 
      name: 'Visual Studio Code', 
      url: 'https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user', 
      icon: '/icons/visual.png',
      description: 'Source code editor'
    },
    { 
      name: 'Malwarebytes', 
      url: 'https://data-cdn.mbamupdates.com/web/mb4-setup-consumer/offline/MBSetup.exe', 
      icon: '/icons/malwarebytes.png',
      description: 'Anti-malware software'
    },
    { 
      name: 'Faceit AC', 
      url: 'https://cdn.faceit.com/faceit/anticheat/FaceitAC_1.0.17.36.exe', 
      icon: '/icons/faceit.png',
      description: 'Anti-cheat software for competitive gaming'
    },
    { 
      name: 'OBS Studio', 
      url: 'https://cdn-fastly.obsproject.com/downloads/OBS-Studio-30.0.2-Full-Installer-x64.exe', 
      icon: 'https://obsproject.com/assets/images/new_icon_small-r.png',
      description: 'Free and open source streaming software'
    },
    { 
      name: 'Chrome', 
      url: 'https://dl.google.com/chrome/install/latest/chrome_installer.exe', 
      icon: 'https://www.google.com/chrome/static/images/chrome-logo-m100.svg',
      description: 'Web browser by Google'
    }
  ];

  const handleDownload = async (app) => {
    try {
      setLoading(app.name);
      setStatus(`Downloading ${app.name}...`);
      const result = await invoke('download_and_run', { name: app.name, url: app.url });
      setStatus(result);
    } catch (error) {
      setStatus(`Error downloading ${app.name}: ${error}`);
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
          Downloads
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#a0a0a0' 
        }}>
          Download and install popular applications
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {apps.map((app, index) => (
          <div key={index} style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
            transition: 'all 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 16px',
              borderRadius: '12px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.05)'
            }}>
              <img 
                src={app.icon} 
                alt={app.name}
                style={{
                  width: '48px',
                  height: '48px',
                  objectFit: 'contain'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div style={{
                display: 'none',
                fontSize: '24px',
                color: '#8b5cf6'
              }}>
                📦
              </div>
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '8px'
            }}>
              {app.name}
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#a0a0a0',
              marginBottom: '16px',
              lineHeight: '1.4'
            }}>
              {app.description}
            </p>
            <button
              onClick={() => handleDownload(app)}
              disabled={loading === app.name}
              style={{
                width: '100%',
                padding: '12px 20px',
                background: loading === app.name ? 'rgba(139, 92, 246, 0.5)' : '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: loading === app.name ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {loading === app.name ? (
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
                'Download'
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

export default Apps;