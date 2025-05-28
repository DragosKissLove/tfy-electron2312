const { ipcRenderer } = window.require('electron');

export const downloadAndRun = async (name, url) => {
  try {
    const result = await ipcRenderer.invoke('download-and-run', { name, url });
    console.log(`Download result: ${result}`);
  } catch (error) {
    console.error(`Download error: ${error.message}`);
    throw error;
  }
};