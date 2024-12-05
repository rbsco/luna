class BrowserNavigation {
  private history: string[] = [];
  private currentIndex: number = -1;

  constructor() {
    this.initializeEventListeners();
  }

  private initializeEventListeners() {
    const backButton = document.querySelector('.search-bar button:first-child');
    const forwardButton = document.querySelector('.search-bar button:nth-child(2)');

    backButton?.addEventListener('click', () => this.goBack());
    forwardButton?.addEventListener('click', () => this.goForward());
  }

  navigateTo(url: string) {
    // Remove any forward history after current point
    this.history = this.history.slice(0, this.currentIndex + 1);
    
    this.history.push(url);
    this.currentIndex++;
  }

  goBack() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }

  goForward() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null;
  }
}

// Initialize navigation
const browserNav = new BrowserNavigation();

// Integrate with launch function
async function launchWebsite() {
  const searchInput = document.querySelector('.search-bar input') as HTMLInputElement;
  const url = searchInput.value.trim();

  if (url) {
    browserNav.navigateTo(url);
    // Your existing launch logic...
  }
}
