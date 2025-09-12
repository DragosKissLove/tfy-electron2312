import React, { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

const Apps = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(null);

  const apps = [
    { name: 'Discord', url: 'https://dl.discordapp.net/distro/app/stable/win/x86/1.0.9014/DiscordSetup.exe', icon: '💬' },
    { name: 'Steam', url: 'https://cdn.akamai.steamstatic.com/client/installer/SteamSetup.exe', icon: '🎮' },
    { name: 'Spotify', url: 'https://download.scdn.co/SpotifySetup.exe', icon: '🎵' },
    { name: 'Brave Browser', url: 'https://laptop-updates.brave.com/latest/winx64', icon: '🦁' },
    { name: 'VLC Player', url: 'https://get.videolan.org/vlc/3.0.20/win64/vlc-3.0.20-win64.exe', icon: '🎬' },
    { name: 'WinRAR', url: 'https://www.rarlab.com/rar/winrar-x64-621.exe', icon: '📦' },
    { name: 'Epic Games', url: 'https://launcher-public-service-prod06.ol.epicgames.com/launcher/api/installer/download/EpicGamesLauncherInstaller.msi', icon: '🎯' },
    { name: 'Visual Studio Code', url: 'https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user', icon: '💻' },
    { name: 'Malwarebytes', url: 'https://data-cdn.mbamupdates.com/web/mb4-setup-consumer/offline/MBSetup.exe', icon: '🛡️' },
    { name: 'Faceit AC', url: 'https://cdn.faceit.com/faceit/anticheat/FaceitAC_1.0.17.36.exe', icon: '⚡' }
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
    <div className="apps-page">
      <div className="page-header">
        <h1 className="page-title">Downloads</h1>
        <p className="page-subtitle">Download and install popular applications</p>
      </div>

      <div className="apps-grid grid grid-4">
        {apps.map((app, index) => (
          <div key={index} className="app-card card">
            <div className="app-icon">{app.icon}</div>
            <h3 className="app-name">{app.name}</h3>
            <button
              className={`button ${loading === app.name ? 'loading' : ''}`}
              onClick={() => handleDownload(app)}
              disabled={loading === app.name}
            >
              {loading === app.name ? (
                <>
                  <div className="loading"></div>
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
        <div className={`status-message ${status.includes('Error') ? 'error' : 'success'}`}>
          {status}
        </div>
      )}

      <style jsx>{`
        .apps-grid {
          margin-bottom: 24px;
        }

        .app-card {
          text-align: center;
          padding: 24px;
          transition: all 0.2s;
        }

        .app-card:hover {
          transform: translateY(-4px);
        }

        .app-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .app-name {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 16px;
        }

        .app-card .button {
          width: 100%;
          justify-content: center;
        }

        .button.loading {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default Apps;