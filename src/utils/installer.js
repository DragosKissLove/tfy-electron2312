export const downloadAndRun = async (name, url) => {
  try {
    // Use electron's IPC to handle downloads
    const result = await window.electron.runFunction('download-app', {
      name,
      url,
    });

    if (result.success) {
      // Show success message
      alert(`✅ ${name} has been downloaded successfully. Please run the installer.`);
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    alert(`❌ Download failed: ${error.message}`);
  }
};