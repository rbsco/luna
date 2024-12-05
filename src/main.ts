import { invoke } from "@tauri-apps/api/core";

let greetInputEl: HTMLInputElement | null;
let greetMsgEl: HTMLElement | null;
let searchBarEl: HTMLElement | null;

async function greet() {
  if (greetMsgEl && greetInputEl) {
    greetMsgEl.textContent = await invoke("greet", {
      name: greetInputEl.value,
    });
  }
}

function initSearchBarVisibility() {
  searchBarEl = document.querySelector('.search-bar');
  const mainContainer = document.querySelector('.container');
  
  if (searchBarEl && mainContainer) {
    // Start hidden
    searchBarEl.classList.remove('visible');

    let hideTimeout: number;
    let isInteracting = false;

    // Add listeners to all interactive elements in the search bar
    const interactiveElements = searchBarEl.querySelectorAll('button, input');
    interactiveElements.forEach(element => {
      element.addEventListener('focus', () => {
        isInteracting = true;
        clearTimeout(hideTimeout);
        searchBarEl?.classList.add('visible');
      });

      element.addEventListener('blur', () => {
        isInteracting = false;
        hideTimeout = window.setTimeout(() => {
          if (!isInteracting) {
            searchBarEl?.classList.remove('visible');
          }
        }, 200);
      });
    });

    // Main container hover logic
    mainContainer.addEventListener('mouseenter', () => {
      if (!isInteracting) {
        searchBarEl?.classList.add('visible');
      }
    });

    mainContainer.addEventListener('mouseleave', () => {
      if (!isInteracting) {
        hideTimeout = window.setTimeout(() => {
          searchBarEl?.classList.remove('visible');
        }, 200);
      }
    });

    // Launch button specific handling
    const launchButton = searchBarEl.querySelector('button[type="submit"]');
    launchButton?.addEventListener('click', () => {
      const searchInput = searchBarEl?.querySelector('input') as HTMLInputElement;
      if (searchInput && searchInput.value.trim()) {
        // Perform launch action here
        console.log('Launching:', searchInput.value);
        
        // Hide after a short delay
        setTimeout(() => {
          searchBarEl?.classList.remove('visible');
        }, 500);
      }
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });

  // Initialize search bar visibility
  initSearchBarVisibility();
});

