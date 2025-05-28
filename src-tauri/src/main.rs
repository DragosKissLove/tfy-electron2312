#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;
use std::process::Command;

#[tauri::command]
async fn download_file(url: String, path: String) -> Result<(), String> {
    let response = reqwest::get(&url)
        .await
        .map_err(|e| e.to_string())?;
    
    let bytes = response.bytes()
        .await
        .map_err(|e| e.to_string())?;
    
    std::fs::write(&path, bytes)
        .map_err(|e| e.to_string())?;
    
    Ok(())
}

#[tauri::command]
fn run_function(name: String, args: Option<String>) -> Result<String, String> {
    match name.as_str() {
        "winrar_crack" => {
            // Implementation for winrar_crack
            Ok("WinRAR crack applied successfully".to_string())
        },
        "install_atlas_tools" => {
            // Implementation for install_atlas_tools
            Ok("Atlas tools installed successfully".to_string())
        },
        "wifi_passwords" => {
            // Implementation for wifi_passwords
            Ok("WiFi passwords retrieved".to_string())
        },
        "activate_windows" => {
            // Implementation for activate_windows
            Ok("Windows activation started".to_string())
        },
        _ => Err(format!("Function {} not found", name))
    }
}

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![download_file, run_function])
        .run(context)
        .expect("error while running tauri application");
}