// Add these new functions to your existing run_function match statement:

"extended_cleanup" => {
    Command::new("cmd")
        .args(&["/C", "cleanmgr /sageset:65535 && cleanmgr /sagerun:65535"])
        .output()
        .map_err(|e| e.to_string())?;
    Ok("Extended disk cleanup completed successfully!".to_string())
},
"run_registry_file" => {
    let path = args.ok_or("Registry file path required")?;
    Command::new("regedit")
        .args(&["/s", &path])
        .output()
        .map_err(|e| e.to_string())?;
    Ok("Registry settings updated successfully!".to_string())
},
"run_command_file" => {
    let path = args.ok_or("Command file path required")?;
    Command::new("cmd")
        .args(&["/C", &path])
        .output()
        .map_err(|e| e.to_string())?;
    Ok("Command executed successfully!".to_string())
},