export const downloadAndRun = async (name, url) => {
  try {
    // Use the exposed downloadApp function
    const result = await window.electron.downloadApp(name, url);

    if (result.success) {
      alert(`✅ ${name} has been downloaded to your Downloads folder. Please run the installer.`);
    } else {
      throw new Error(result.error || 'Download failed');
    }
  } catch (error) {
    alert(`❌ Download failed: ${error.message}`);
  }
};