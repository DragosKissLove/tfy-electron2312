const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  runFunction: async (name, args) => {
    try {
      return await ipcRenderer.invoke('run-function', { name, args });
    } catch (error) {
      console.error('Function execution error:', error);
      throw error;
    }
  },
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),
  platform: process.platform,
  minimize: () => ipcRenderer.invoke('minimize-window'),
  close: () => ipcRenderer.invoke('close-window')
});