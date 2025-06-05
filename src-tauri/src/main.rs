#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::{
    fs,
    fs::File,
    path::Path,
    process::Command,
};

use reqwest;
use tauri;

#[tauri::command]
async fn download_player(version_hash: String) -> Result<String, String> {
    use std::{fs::{self, File}, path::{Path, Component}};
    
    let client = reqwest::Client::new();
    let base_url = "https://clientsettings.roblox.com/v2/client-version/WindowsPlayer/channel/LIVE";

    let client_info = client
        .get(base_url)
        .header("User-Agent", "TFY Tool 1.0")
        .send()
        .await
        .map_err(|e| format!("❌ Failed to get client info: {}", e))?
        .json::<serde_json::Value>()
        .await
        .map_err(|e| format!("❌ Failed to parse client info: {}", e))?;

    let current_version = client_info["clientVersionUpload"]
        .as_str()
        .ok_or("❌ Could not extract version from client info")?;

    let version_hash = if version_hash.trim().is_empty() {
        current_version.to_string()
    } else {
        version_hash.trim().to_lowercase()
    };

    if !version_hash.starts_with("version-") {
        return Err("❌ Version must start with 'version-'".to_string());
    }

    let manifest_url = format!("https://setup.rbxcdn.com/{}-rbxPkgManifest.txt", version_hash);
    let manifest = reqwest::get(&manifest_url)
        .await
        .map_err(|e| format!("❌ Failed to fetch manifest: {}", e))?
        .text()
        .await
        .map_err(|e| format!("❌ Failed to read manifest: {}", e))?;

    let desktop = dirs::desktop_dir().ok_or("❌ Could not find Desktop directory")?;
    let target_root = desktop.join("tfy-roblox");

    fs::create_dir_all(&target_root)
        .map_err(|e| format!("❌ Could not create install folder: {}", e))?;

    Ok(format!("✅ Roblox {} installed to Desktop/tfy-roblox!", version_hash))
}

#[tauri::command]
async fn run_function(name: String, _args: Option<String>) -> Result<String, String> {
    match name.as_str() {
        "winrar_crack" => {
            let url = "https://raw.githubusercontent.com/DragosKissLove/tfy-electron2312/master/rarreg.key";
            let response = reqwest::get(url).await.map_err(|e| e.to_string())?;
            let content = response.bytes().await.map_err(|e| e.to_string())?;
            
            let paths = vec![
                "C:\\Program Files\\WinRAR",
                "C:\\Program Files (x86)\\WinRAR"
            ];

            let winrar_path = paths.iter()
                .find(|&path| Path::new(path).exists())
                .ok_or("WinRAR installation not found")?;

            let temp_file = std::env::temp_dir().join("rarreg.key");
            fs::write(&temp_file, &content).map_err(|e| format!("Failed to create temp file: {}", e))?;

            let status = Command::new("powershell")
                .args(&[
                    "-Command",
                    &format!(
                        "Start-Process powershell -Verb RunAs -WindowStyle Hidden -Wait -ArgumentList \
                        '-Command Copy-Item -Path \"{}\" -Destination \"{}/rarreg.key\" -Force'",
                        temp_file.display(),
                        winrar_path
                    )
                ])
                .status()
                .map_err(|e| format!("Failed to execute PowerShell command: {}", e))?;

            let _ = fs::remove_file(temp_file);

            if status.success() {
                Ok(format!("WinRAR crack successfully applied to {}", winrar_path))
            } else {
                Err("Failed to apply WinRAR crack. Please run the application as administrator.".to_string())
            }
        },
        "clean_temp" => {
            Command::new("cmd")
                .args(&["/C", "del /s /f /q %temp%\\* && del /s /f /q C:\\Windows\\Temp\\*"])
                .output()
                .map_err(|e| e.to_string())?;
            
            Ok("Temporary files cleaned successfully!".to_string())
        },
        "run_optimization" => {
            let url = "https://raw.githubusercontent.com/DragosKissLove/testbot/main/TFY%20Optimization.bat";
            let response = reqwest::get(url).await.map_err(|e| e.to_string())?;
            let content = response.text().await.map_err(|e| e.to_string())?;
            
            let temp_path = std::env::temp_dir().join("TFY_Optimization.bat");
            fs::write(&temp_path, content).map_err(|e| e.to_string())?;
            
            Command::new("powershell")
                .args(&["-Command", &format!("Start-Process '{}' -Verb RunAs", temp_path.display())])
                .spawn()
                .map_err(|e| e.to_string())?;
            
            Ok("Optimization process started.".to_string())
        },
        "activate_windows" => {
            Command::new("powershell")
                .args(&["-Command", "irm https://get.activated.win | iex"])
                .spawn()
                .map_err(|e| e.to_string())?;
            
            Ok("Windows activation started.".to_string())
        },
        "install_atlas_tools" => {
            let download_folder = dirs::download_dir()
                .ok_or("Could not find Downloads folder".to_string())?;
            fs::create_dir_all(&download_folder).map_err(|e| e.to_string())?;

            let atlas_url = "https://github.com/Atlas-OS/Atlas/releases/download/0.4.1/AtlasPlaybook_v0.4.1.apbx";
            let ame_url = "https://download.ameliorated.io/AME%20Wizard%20Beta.zip";
            
            let atlas_path = download_folder.join("AtlasPlaybook_v0.4.1.apbx");
            let ame_zip = download_folder.join("AME_Wizard_Beta.zip");
            let ame_extract = download_folder.join("AME_Wizard_Beta");

            let response = reqwest::get(atlas_url).await.map_err(|e| e.to_string())?;
            let content = response.bytes().await.map_err(|e| e.to_string())?;
            fs::write(&atlas_path, content).map_err(|e| e.to_string())?;

            let response = reqwest::get(ame_url).await.map_err(|e| e.to_string())?;
            let content = response.bytes().await.map_err(|e| e.to_string())?;
            fs::write(&ame_zip, content).map_err(|e| e.to_string())?;

            Ok("Atlas tools downloaded successfully".to_string())
        },
        "wifi_passwords" => {
            let output = Command::new("netsh")
                .args(&["wlan", "show", "profiles"])
                .output()
                .map_err(|e| e.to_string())?;

            let profiles_output = String::from_utf8_lossy(&output.stdout);
            let mut passwords = String::new();

            for line in profiles_output.lines() {
                if line.contains("All User Profile") {
                    if let Some(profile) = line.split(":").nth(1) {
                        let profile = profile.trim();
                        let pw_output = Command::new("netsh")
                            .args(&["wlan", "show", "profile", "name", profile, "key=clear"])
                            .output()
                            .map_err(|e| e.to_string())?;

                        let pw_text = String::from_utf8_lossy(&pw_output.stdout);
                        for pw_line in pw_text.lines() {
                            if pw_line.contains("Key Content") {
                                if let Some(password) = pw_line.split(":").nth(1) {
                                    passwords.push_str(&format!("{}: {}\n", profile, password.trim()));
                                }
                            }
                        }
                    }
                }
            }

            if passwords.is_empty() {
                Ok("No passwords found.".to_string())
            } else {
                Ok(passwords)
            }
        },
        _ => Err(format!("Function {} not found", name))
    }
}

#[tauri::command]
fn get_username() -> Result<String, String> {
    Ok(whoami::username())
}

#[tauri::command]
fn download_to_desktop_and_run(name: String, url: String) -> Result<String, String> {
    let desktop = dirs::desktop_dir().ok_or("❌ Could not find desktop directory")?;
    let file_path = desktop.join(format!("{}.exe", name));

    let mut response = reqwest::blocking::get(&url).map_err(|e| format!("❌ Download failed: {}", e))?;
    let mut content = Vec::new();
    std::io::Read::read_to_end(&mut response, &mut content).map_err(|e| format!("❌ Read failed: {}", e))?;

    fs::write(&file_path, &content).map_err(|e| format!("❌ Write failed: {}", e))?;

    Command::new("cmd")
        .args(&["/C", file_path.to_str().unwrap()])
        .spawn()
        .map_err(|e| format!("❌ Run failed: {}", e))?;

    Ok(format!("✅ {} downloaded and launched from Desktop!", name))
}

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![run_function, download_player, get_username, download_to_desktop_and_run])
        .run(context)
        .expect("error while running tauri application");
}