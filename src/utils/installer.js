export const downloadAndRun = async (name, url) => {
  try {
    if (!window.electron) {
      throw new Error('Electron API not available');
    }

    const result = await window.electron.runFunction('download-app', { name, url });
    
    if (result.success) {
      return { success: true, message: `${name} has been downloaded successfully!` };
    } else {
      throw new Error(result.error || 'Download failed');
    }
  } catch (error) {
    console.error('Download error:', error);
    throw new Error(`Download failed: ${error.message}`);
  }
};