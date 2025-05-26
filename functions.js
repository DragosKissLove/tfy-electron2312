// functions.js
const fs = require('fs');
const https = require('https');
const path = require('path');
const os = require('os');
const unzipper = require('unzipper');
const { shell } = require('electron');
const { exec } = require('child_process');

function activateWindows() {
  exec('powershell -Command "irm https://get.activated.win | iex"', (error) => {
    if (error) console.error("Activation Error:", error.message);
    else console.log("Activation process started.");
  });
}

async function winrarCrack() {
  try {
    const url = "https://github.com/jtlw99/crack-winrar/releases/download/v1/rarreg.key";
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Download failed: ${res.statusText}`);
    }

    const buffer = await res.buffer();

    const destinations = [
      'C:\\Program Files\\WinRAR\\rarreg.key',
      'C:\\Program Files (x86)\\WinRAR\\rarreg.key'
    ];

    for (const dest of destinations) {
      try {
        fs.writeFileSync(dest, buffer);
        return `✅ Crack applied in: ${dest}`;
      } catch (err) {
        // Continuă dacă nu poate scrie în folderul respectiv
      }
    }

    return '⚠️ No valid WinRAR path found.';
  } catch (err) {
    return `❌ Error: ${err.message}`;
  }
}

module.exports = { winrarCrack };

function installAtlasTools() {
  const downloadFolder = path.join(os.homedir(), 'Downloads');
  const atlasUrl = 'https://github.com/Atlas-OS/Atlas/releases/download/0.4.1/AtlasPlaybook_v0.4.1.apbx';
  const ameUrl = 'https://download.ameliorated.io/AME%20Wizard%20Beta.zip';
  const atlasPath = path.join(downloadFolder, 'AtlasPlaybook_v0.4.1.apbx');
  const ameZip = path.join(downloadFolder, 'AME_Wizard_Beta.zip');
  const ameExtract = path.join(downloadFolder, 'AME_Wizard_Beta');

  fs.mkdirSync(downloadFolder, { recursive: true });

  const downloadFile = (url, dest, callback) => {
    const file = fs.createWriteStream(dest);
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => file.close(callback));
    }).on('error', err => {
      fs.unlinkSync(dest);
      console.error(`Download error: ${err.message}`);
    });
  };

  downloadFile(atlasUrl, atlasPath, () => {
    downloadFile(ameUrl, ameZip, () => {
      fs.createReadStream(ameZip)
        .pipe(unzipper.Extract({ path: ameExtract }))
        .on('close', () => {
          fs.readdir(ameExtract, (err, files) => {
            if (err) return console.error('Extract error:', err);
            for (const file of files) {
              if (file.endsWith('.exe')) {
                shell.openPath(path.join(ameExtract, file));
                return;
              }
            }
            console.error('No executable found.');
          });
        });
    });
  });
}

function getWifiPasswords() {
  exec('netsh wlan show profiles', (err, stdout) => {
    if (err) return console.error('Error:', err);

    const profileNames = stdout.match(/All User Profile\s*:\s(.*)/g)?.map(line => line.split(':')[1].trim()) || [];
    if (!profileNames.length) {
      console.log('No WiFi profiles found.');
      return;
    }

    profileNames.forEach(profile => {
      exec(`netsh wlan show profile name="${profile}" key=clear`, (err2, stdout2) => {
        if (err2) return;

        const match = stdout2.match(/Key Content\s*:\s(.*)/);
        if (match) {
          const password = match[1];
          console.log(`${profile}: ${password}`);
        }
      });
    });
  });
}

module.exports = {
  activate_windows: activateWindows,
  winrar_crack: winrarCrack,
  install_atlas_tools: installAtlasTools,
  wifi_passwords: getWifiPasswords,
};
