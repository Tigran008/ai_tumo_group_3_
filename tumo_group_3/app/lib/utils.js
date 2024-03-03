export function downloadBase64Image(base64Image, filename) {
    // Create an anchor element
    const anchor = document.createElement('a');
    
    // Set the href to the base64 string
    // It should include the full prefix, e.g., 'data:image/png;base64,...'
    anchor.href = base64Image;
    
    // Set the download attribute to the desired filename
    anchor.download = filename;
    
    // Append the anchor to the body, click it, and then remove it
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
  