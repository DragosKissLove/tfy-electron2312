import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import { motion } from 'framer-motion';
import { downloadAndRun } from '../utils/installer';

const apps = [
  { name: 'Spotify', icon: 'spotify.png', url: 'https://download.scdn.co/SpotifySetup.exe' },
  { name: 'Steam', icon: 'steam.png', url: 'https://cdn.akamai.steamstatic.com/client/installer/SteamSetup.exe' },
  { name: 'Discord', icon: 'discord.png', url: 'https://dl.discordapp.net/distro/app/stable/win/x86/1.0.9014/DiscordSetup.exe' },
  { name: 'Brave', icon: 'brave.png', url: 'https://laptop-updates.brave.com/latest/winx64' },
  { name: 'Faceit AC', icon: 'faceit.png', url: 'https://cdn.faceit.com/faceit/anticheat/FaceitAC_1.0.17.36.exe' },
  { name: 'VLC', icon: 'vlc.png', url: 'https://get.videolan.org/vlc/3.0.20/win64/vlc-3.0.20-win64.exe' },
  { name: 'Malwarebytes', icon: 'malwarebytes.png', url: 'https://data-cdn.mbamupdates.com/web/mb4-setup-consumer/offline/MBSetup.exe' },
  { name: 'WinRAR', icon: 'winrar.png', url: 'https://www.rarlab.com/rar/winrar-x64-621.exe' },
  { name: 'Epic Games', icon: 'epic.png', url: 'https://launcher-public-service-prod06.ol.epicgames.com/launcher/api/installer/download/EpicGamesLauncherInstaller.msi' },
  { name: 'Stremio', icon: 'stremio.png', url: 'https://dl.strem.io/stremio-shell-ng/v5.0.5/StremioSetup-v5.0.5.exe' },
  { name: 'TuxlerVPN', icon: 'tuxler.png', url: 'https://dl.strem.io/stremio-shell-ng/v5.0.5/StremioSetup-v5.0.5.exe' },
  { name: 'Visual Studio Code', icon: 'visual.png', url: 'https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user' },
];

const Apps = () => {
  const { theme, primaryColor } = useTheme();
  const [hoveredApp, setHoveredApp] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    show: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    }
  };

  const headerVariants = {
    hidden: { 
      opacity: 0,
      x: -20,
      scale: 0.95
    },
    show: { 
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      style={{ padding: '30px' }}
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <motion.h2 
        variants={headerVariants}
        style={{ 
          fontSize: '28px',
          fontWeight: '600',
          marginBottom: '20px',
          color: theme.text,
          borderBottom: `2px solid ${primaryColor}`,
          paddingBottom: '10px',
          display: 'inline-block',
          position: 'relative'
        }}
      >
        Install Apps
        <motion.div
          style={{
            position: 'absolute',
            bottom: '-2px',
            left: 0,
            right: 0,
            height: '2px',
            background: primaryColor,
            boxShadow: `0 0 10px ${primaryColor}`
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scaleX: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.h2>

      <motion.div
        variants={containerVariants}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
          gap: '20px',
        }}
      >
        {apps.map((app) => {
          const isHovered = hoveredApp === app.name;
          return (
            <motion.button
              key={app.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoveredApp(app.name)}
              onMouseLeave={() => setHoveredApp(null)}
              onClick={() => downloadAndRun(app.name, app.url)}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${primaryColor}33`,
                borderRadius: '16px',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                color: theme.text,
                padding: '16px 12px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                boxShadow: isHovered
                  ? `0 4px 22px ${primaryColor}66`
                  : `0 2px 12px ${primaryColor}33`,
                filter: hoveredApp && hoveredApp !== app.name ? 'blur(2px) brightness(0.7)' : 'none',
                opacity: hoveredApp && hoveredApp !== app.name ? 0.6 : 1,
              }}
            >
              <img
                src={`icons/${app.icon}`}
                alt={app.name}
                style={{
                  width: '28px',
                  height: '28px',
                  marginBottom: '10px',
                }}
              />
              {app.name}
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default Apps;