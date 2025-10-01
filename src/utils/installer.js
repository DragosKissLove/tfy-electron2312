export const downloadAndRun = async (name, url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new Blob([blob], { type: 'application/octet-stream' });
    const fileURL = URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = fileURL;
    link.download = `${name}.exe`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Dacă ai un sistem de notificare în React, folosește-l aici
    alert(`🔧 ${name} se descarcă... deschide installer-ul manual după ce se termină.`);
  } catch (error) {
    alert(`❌ Eroare la descărcare: ${error.message}`);
  }
};


