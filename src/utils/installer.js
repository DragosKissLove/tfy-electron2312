export const isElectronAvailable = () => {
  return window.electron !== undefined;
};

export const downloadAndRun = async (name, url) => {
  try {
    if (!isElectronAvailable()) {
      throw new Error('This feature is only available in the desktop application');
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