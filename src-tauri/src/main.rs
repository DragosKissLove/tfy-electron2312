#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;
use std::fs;
use std::path::Path;
use tauri::Manager;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct SystemInfo {
    os: String,
    ram: String,
    cpu: String,
    gpu: String,
}

#[tauri::command]
async fn download_and_run(name: String, url: String) -> Result<String, String> {
    let temp_dir = std::env::temp_dir();
    let file_path = temp_dir.join(format!("{}.exe", name));
    
    let response = reqwest::get(&url).await.map_err(|e| e.to_string())?;
    let bytes = response.bytes().await.map_err(|e| e.to_string())?;
    
    fs::write(&file_path, bytes).map_err(|e| e.to_string())?;
    
    Command::new(&file_path)
        .spawn()
        .map_err(|e| e.to_string())?;
    
    Ok(format!("{} has been downloaded and launched successfully!", name))
}

#[tauri::command]
fn run_function(name: String) -> Result<String, String> {
    match name.as_str() {
        "clean_temp" => {
            Command::new("cmd")
                .args(&["/C", "del /s /f /q %temp%\\* && del /s /f /q C:\\Windows\\Temp\\*"])
                .output()
                .map_err(|e| e.to_string())?;
            Ok("Temporary files cleaned successfully!".to_string())
        },
        "run_optimization" => {
            let script_url = "https://raw.githubusercontent.com/DragosKissLove/testbot/main/TFY%20Optimization.bat";
            let temp_path = std::env::temp_dir().join("TFY_Optimization.bat");
            
            let rt = tokio::runtime::Runtime::new().unwrap();
            rt.block_on(async {
                let response = reqwest::get(script_url).await.map_err(|e| e.to_string())?;
                let content = response.text().await.map_err(|e| e.to_string())?;
                fs::write(&temp_path, content).map_err(|e| e.to_string())?;
                Ok::<(), String>(())
            })?;
            
            Command::new("powershell")
                .args(&["-Command", &format!("Start-Process '{}' -Verb RunAs", temp_path.display())])
                .output()
                .map_err(|e| e.to_string())?;
            
            Ok("System optimization started successfully!".to_string())
        },
        "activate_windows" => {
            Command::new("powershell")
                .args(&["-Command", "irm https://get.activated.win | iex"])
                .output()
                .map_err(|e| e.to_string())?;
            Ok("Windows activation process started!".to_string())
        },
        "winrar_crack" => {
            let key_url = "https://github.com/jtlw99/crack-winrar/releases/download/v1/rarreg.key";
            let paths = vec![
                "C:\\Program Files\\WinRAR\\rarreg.key",
                "C:\\Program Files (x86)\\WinRAR\\rarreg.key"
            ];
            
            let rt = tokio::runtime::Runtime::new().unwrap();
            let content = rt.block_on(async {
                let response = reqwest::get(key_url).await.map_err(|e| e.to_string())?;
                response.bytes().await.map_err(|e| e.to_string())
            })?;
            
            for path in paths {
                if let Ok(_) = fs::write(path, &content) {
                    return Ok(format!("WinRAR crack applied successfully to {}", path));
                }
            }
            Err("No valid WinRAR installation found".to_string())
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
                    if let Some(profile_name) = line.split(':').nth(1) {
                        let profile_name = profile_name.trim();
                        let password_output = Command::new("netsh")
                            .args(&["wlan", "show", "profile", &format!("name=\"{}\"", profile_name), "key=clear"])
                            .output();
                        
                        if let Ok(pass_out) = password_output {
                            let pass_str = String::from_utf8_lossy(&pass_out.stdout);
                            for pass_line in pass_str.lines() {
                                if pass_line.contains("Key Content") {
                                    if let Some(password) = pass_line.split(':').nth(1) {
                                        passwords.push_str(&format!("{}: {}\n", profile_name, password.trim()));
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
            if passwords.is_empty() {
                Ok("No WiFi passwords found.".to_string())
            } else {
                Ok(passwords)
            }
        },
        "install_atlas_tools" => {
            let download_folder = dirs::download_dir().unwrap_or_else(|| std::env::current_dir().unwrap());
            let atlas_url = "https://github.com/Atlas-OS/Atlas/releases/download/0.4.1/AtlasPlaybook_v0.4.1.apbx";
            let ame_url = "https://download.ameliorated.io/AME%20Wizard%20Beta.zip";
            
            let rt = tokio::runtime::Runtime::new().unwrap();
            rt.block_on(async {
                // Download Atlas playbook
                let atlas_response = reqwest::get(atlas_url).await.map_err(|e| e.to_string())?;
                let atlas_bytes = atlas_response.bytes().await.map_err(|e| e.to_string())?;
                let atlas_path = download_folder.join("AtlasPlaybook_v0.4.1.apbx");
                fs::write(&atlas_path, atlas_bytes).map_err(|e| e.to_string())?;
                
                // Download AME Wizard
                let ame_response = reqwest::get(ame_url).await.map_err(|e| e.to_string())?;
                let ame_bytes = ame_response.bytes().await.map_err(|e| e.to_string())?;
                let ame_zip_path = download_folder.join("AME_Wizard_Beta.zip");
                fs::write(&ame_zip_path, ame_bytes).map_err(|e| e.to_string())?;
                
                // Extract and run AME Wizard
                let extract_path = download_folder.join("AME_Wizard_Beta");
                let file = fs::File::open(&ame_zip_path).map_err(|e| e.to_string())?;
                let mut archive = zip::ZipArchive::new(file).map_err(|e| e.to_string())?;
                
                for i in 0..archive.len() {
                    let mut file = archive.by_index(i).map_err(|e| e.to_string())?;
                    let outpath = extract_path.join(file.name());
                    
                    if file.name().ends_with('/') {
                        fs::create_dir_all(&outpath).map_err(|e| e.to_string())?;
                    } else {
                        if let Some(p) = outpath.parent() {
                            if !p.exists() {
                                fs::create_dir_all(&p).map_err(|e| e.to_string())?;
                            }
                        }
                        let mut outfile = fs::File::create(&outpath).map_err(|e| e.to_string())?;
                        std::io::copy(&mut file, &mut outfile).map_err(|e| e.to_string())?;
                        
                        if outpath.extension().and_then(|s| s.to_str()) == Some("exe") {
                            Command::new(&outpath).spawn().map_err(|e| e.to_string())?;
                            return Ok("Atlas tools downloaded and AME Wizard launched!".to_string());
                        }
                    }
                }
                
                Ok("Atlas tools downloaded successfully!".to_string())
            })
        },
        _ => Err(format!("Unknown function: {}", name))
    }
}

#[tauri::command]
fn get_username() -> String {
    whoami::username()
}

#[tauri::command]
fn get_system_info() -> SystemInfo {
    let os = format!("{} {}", whoami::distro(), whoami::arch());
    
    // Get RAM info
    let ram = if let Ok(output) = Command::new("wmic")
        .args(&["computersystem", "get", "TotalPhysicalMemory", "/value"])
        .output() {
        let output_str = String::from_utf8_lossy(&output.stdout);
        if let Some(line) = output_str.lines().find(|line| line.contains("TotalPhysicalMemory=")) {
            if let Some(value) = line.split('=').nth(1) {
                if let Ok(bytes) = value.trim().parse::<u64>() {
                    let gb = bytes / (1024 * 1024 * 1024);
                    format!("{}GB", gb)
                } else {
                    "Unknown".to_string()
                }
            } else {
                "Unknown".to_string()
            }
        } else {
            "Unknown".to_string()
        }
    } else {
        "Unknown".to_string()
    };
    
    // Get CPU info
    let cpu = if let Ok(output) = Command::new("wmic")
        .args(&["cpu", "get", "name", "/value"])
        .output() {
        let output_str = String::from_utf8_lossy(&output.stdout);
        if let Some(line) = output_str.lines().find(|line| line.contains("Name=")) {
            if let Some(value) = line.split('=').nth(1) {
                value.trim().to_string()
            } else {
                "Unknown CPU".to_string()
            }
        } else {
            "Unknown CPU".to_string()
        }
    } else {
        "Unknown CPU".to_string()
    };
    
    // Get GPU info
    let gpu = if let Ok(output) = Command::new("wmic")
        .args(&["path", "win32_VideoController", "get", "name", "/value"])
        .output() {
        let output_str = String::from_utf8_lossy(&output.stdout);
        if let Some(line) = output_str.lines().find(|line| line.contains("Name=") && !line.trim_end().ends_with("Name=")) {
            if let Some(value) = line.split('=').nth(1) {
                value.trim().to_string()
            } else {
                "Unknown GPU".to_string()
            }
        } else {
            "Unknown GPU".to_string()
        }
    } else {
        "Unknown GPU".to_string()
    };

    SystemInfo {
        os,
        ram,
        cpu,
        gpu,
    }
}

#[tauri::command]
async fn download_roblox_player(version_hash: String) -> Result<String, String> {
    let base_url = "https://setup.rbxcdn.com";
    let version = if version_hash.starts_with("version-") {
        version_hash
    } else {
        format!("version-{}", version_hash)
    };
    
    let manifest_url = format!("{}/{}-rbxPkgManifest.txt", base_url, version);
    let response = reqwest::get(&manifest_url).await.map_err(|e| e.to_string())?;
    let manifest = response.text().await.map_err(|e| e.to_string())?;
    
    let target_dir = Path::new("C:\\Program Files (x86)\\Roblox\\Versions").join(&version);
    fs::create_dir_all(&target_dir).map_err(|e| e.to_string())?;
    
    // Create AppSettings.xml
    let xml_content = r#"<?xml version="1.0" encoding="UTF-8"?><Settings><ContentFolder>content</ContentFolder><BaseUrl>http://www.roblox.com</BaseUrl></Settings>"#;
    fs::write(target_dir.join("AppSettings.xml"), xml_content).map_err(|e| e.to_string())?;
    
    // Download and extract files
    for line in manifest.lines() {
        let line = line.trim();
        if line.ends_with(".zip") {
            let blob_url = format!("{}/{}-{}", base_url, version, line);
            let response = reqwest::get(&blob_url).await.map_err(|e| e.to_string())?;
            let bytes = response.bytes().await.map_err(|e| e.to_string())?;
            
            // Extract zip content
            let cursor = std::io::Cursor::new(bytes);
            let mut archive = zip::ZipArchive::new(cursor).map_err(|e| e.to_string())?;
            
            for i in 0..archive.len() {
                let mut file = archive.by_index(i).map_err(|e| e.to_string())?;
                if !file.is_dir() {
                    let outpath = target_dir.join(file.name());
                    if let Some(p) = outpath.parent() {
                        fs::create_dir_all(p).map_err(|e| e.to_string())?;
                    }
                    let mut outfile = fs::File::create(&outpath).map_err(|e| e.to_string())?;
                    std::io::copy(&mut file, &mut outfile).map_err(|e| e.to_string())?;
                }
            }
        }
    }
    
    Ok("Roblox player downloaded successfully!".to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            download_and_run,
            run_function,
            get_username,
            get_system_info,
            download_roblox_player
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}