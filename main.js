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

  ipcMain.handle('run-function', async (event, { name, args }) => {
    try {
      switch (name) {
        case 'download-app':
          return await downloadApp(args.name, args.url);
        case 'check-updates':
          return await checkForUpdates();
        case 'clean-temp':
          return await cleanTemp();
        case 'run-optimization':
          return await runOptimization();
        default:
          throw new Error('Function not found');
      }
    } catch (error) {
      console.error('Error:', error);
      return { error: error.message };
    }
  });

  ipcMain.handle('get-settings', () => {
    return store.get('settings');
  });

  ipcMain.handle('save-settings', (event, settings) => {
    store.set('settings', settings);
    return true;
  });
});

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