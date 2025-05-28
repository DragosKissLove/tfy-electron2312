import { invoke } from '@tauri-apps/api/tauri';
import { downloadDir } from '@tauri-apps/api/path';
import { Command } from '@tauri-apps/api/shell';

export const downloadAndRun = async (name, url) => {
  try {
    const downloadPath = await downloadDir();
    const filePath = `${downloadPath}/${name}.exe`;

    // Download and save the file using Tauri
    await invoke('download_file', { url, path: filePath });

    // Execute the downloaded file
    const command = new Command('run_exe', [filePath]);
    await command.execute();

    console.log(`Successfully downloaded and launched ${name}`);
  } catch (error) {
    console.error(`Download error: ${error.message}`);
    throw error;
  }
};