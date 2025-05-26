const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');
const { exec } = require('child_process');
const fs = require('fs');
const axios = require('axios');
const extract = require('extract-zip');
const store = new Store();
const https = require('https');
const os = require('os');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    frame: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  createWindow();

  // Handle IPC calls
  ipcMain.handle('run-function', async (event, { name, args }) => {
    try {
      switch (name) {
        case 'check-updates':
          return await checkForUpdates();
        case 'clean-temp':
          return await cleanTemp();
        case 'run-optimization':
          return await runOptimization();
        case 'download-app':
          return await downloadApp(args.name, args.url);
        case 'github-auth':
          return await handleGithubAuth();
        default:
          throw new Error('Function not found');
      }
    } catch (error) {
      console.error('Error:', error);
      return { error: error.message };
    }
  });

  // Handle settings storage
  ipcMain.handle('get-settings', () => {
    return store.get('settings');
  });

  ipcMain.handle('save-settings', (event, settings) => {
    store.set('settings', settings);
    return true;
  });
});

async function checkForUpdates() {
  try {
    const currentVersion = "3.0.0";
    const response = await axios.get("https://raw.githubusercontent.com/DragosKissLove/testbot/main/tfy_info.json");
    const data = response.data;
    return {
      currentVersion,
      latestVersion: data.version,
      changelog: data.changelog,
      downloadUrl: data.download_url,
      hasUpdate: data.version > currentVersion
    };
  } catch (error) {
    throw new Error(`Update check failed: ${error.message}`);
  }
}

async function cleanTemp() {
  return new Promise((resolve, reject) => {
    exec('del /s /f /q %temp%\\* && del /s /f /q C:\\Windows\\Temp\\*', (error) => {
      if (error) {
        reject(new Error(`Failed to clean temp files: ${error.message}`));
      } else {
        resolve({ success: true, message: 'Temporary files cleaned successfully!' });
      }
    });
  });
}

async function runOptimization() {
  try {
    const response = await axios.get("https://raw.githubusercontent.com/DragosKissLove/testbot/main/TFY%20Optimization.bat");
    const tempPath = path.join(app.getPath('temp'), "TFY_Optimization.bat");
    fs.writeFileSync(tempPath, response.data);
    
    return new Promise((resolve, reject) => {
      exec(`powershell -Command "Start-Process '${tempPath}' -Verb RunAs"`, (error) => {
        if (error) {
          reject(new Error(`Optimization failed: ${error.message}`));
        } else {
          resolve({ success: true, message: 'Optimization completed successfully!' });
        }
      });
    });
  } catch (error) {
    throw new Error(`Failed to run optimization: ${error.message}`);
  }
}

async function downloadApp(name, url) {
  try {
    const downloadPath = path.join(os.homedir(), 'Downloads', `${name}.exe`);
    
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    const writer = fs.createWriteStream(downloadPath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve({ success: true }));
      writer.on('error', reject);
    });
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function downloadRobloxPlayer(versionHash, logCallback, progressCallback) {
  try {
    const base_url = "https://setup.rbxcdn.com";
    versionHash = versionHash.strip().toLowerCase();
    if (!versionHash.startsWith("version-")) {
      versionHash = `version-${versionHash}`;
    }

    const manifest_url = `${base_url}/${versionHash}-rbxPkgManifest.txt`;
    const response = await axios.get(manifest_url);
    const lines = response.data.split('\n').filter(line => line.trim().endsWith('.zip'));

    const target_root = path.join("C:", "Program Files (x86)", "Roblox", "Versions", versionHash);
    fs.mkdirSync(target_root, { recursive: true });

    const xml = '<?xml version="1.0" encoding="UTF-8"?><Settings><ContentFolder>content</ContentFolder><BaseUrl>http://www.roblox.com</BaseUrl></Settings>';
    fs.writeFileSync(path.join(target_root, "AppSettings.xml"), xml);

    for (const name of lines) {
      const blob_url = `${base_url}/${versionHash}-${name}`;
      const response = await axios.get(blob_url, {
        responseType: 'arraybuffer',
        onDownloadProgress: (progressEvent) => {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          progressCallback(percentage);
        }
      });

      const zipPath = path.join(target_root, name);
      fs.writeFileSync(zipPath, response.data);
      await extract(zipPath, { dir: target_root });
      fs.unlinkSync(zipPath);
      logCallback(`Extracted ${name}`);
    }

    return { success: true, message: 'Roblox version installed successfully!' };
  } catch (error) {
    throw new Error(`Failed to download Roblox: ${error.message}`);
  }
}

async function handleGithubAuth() {
  // Implementation will be added in the next update
  throw new Error('Function not implemented yet');
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});