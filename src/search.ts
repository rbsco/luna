import { invoke } from "@tauri-apps/api/core";
import { client } from "@tauri-apps/plugin-http";

async function launchWebsite() {
  const searchInput = document.querySelector('.search-bar input') as HTMLInputElement;
  const url = searchInput.value.trim();

  if (!url) {
    console.error('No URL provided');
    return;
  }

  try {
    // Normalize URL
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;

    // Option 1: Frontend Fetch (Simple)
    const response = await fetch(formattedUrl, {
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Optional: You could add Tauri backend processing here
    const pageContent = await response.text();
    console.log('Page fetched successfully:', pageContent.slice(0, 200) + '...');

    // Potentially invoke a Rust command to handle the webpage
    const rustProcessingResult = await invoke('process_webpage', { 
      url: formattedUrl,
      content: pageContent 
    });

  } catch (error) {
    console.error('Website launch failed:', error);
  }
}

// Add event listener to Launch button
function initializeLaunchButton() {
  const launchButton = document.querySelector('.search-bar button[type="submit"]');
  launchButton?.addEventListener('click', launchWebsite);
}

window.addEventListener("DOMContentLoaded", () => {
  initializeLaunchButton();
});
