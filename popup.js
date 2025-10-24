// JustSayNo Popup Script
document.addEventListener('DOMContentLoaded', async () => {
  await loadStats();
  await loadSettings();
  setupEventListeners();
});

// Load and display statistics
async function loadStats() {
  try {
    const stats = await chrome.runtime.sendMessage({ type: 'GET_STATS' });
    
    // Update stat displays
    document.getElementById('monthlyClicks').textContent = stats.clicksThisMonth || 0;
    document.getElementById('totalClicks').textContent = stats.totalClicks || 0;
    
    // Calculate days since install
    if (stats.installDate) {
      const installDate = new Date(stats.installDate);
      const now = new Date();
      const daysSince = Math.floor((now - installDate) / (1000 * 60 * 60 * 24));
      document.getElementById('daysSinceInstall').textContent = daysSince;
    }
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
}

// Load user settings
async function loadSettings() {
  try {
    const settings = await chrome.storage.sync.get([
      'userPreference',
      'aggressiveMode',
      'showNotifications'
    ]);
    
    document.getElementById('preference').value = settings.userPreference || 'reject';
    document.getElementById('aggressiveMode').checked = settings.aggressiveMode || false;
    document.getElementById('showNotifications').checked = settings.showNotifications !== false;
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
}

// Setup event listeners
function setupEventListeners() {
  // Preference change
  document.getElementById('preference').addEventListener('change', async (e) => {
    await chrome.storage.sync.set({ userPreference: e.target.value });
    showToast('Preference updated!');
  });
  
  // Aggressive mode toggle (disabled - coming soon)
  document.getElementById('aggressiveMode').addEventListener('change', async (e) => {
    // Feature disabled for now
    showToast('Aggressive mode coming soon!', 'info');
  });
  
  // Notifications toggle
  document.getElementById('showNotifications').addEventListener('change', async (e) => {
    await chrome.storage.sync.set({ showNotifications: e.target.checked });
  });
  
  // Share button
  document.getElementById('shareBtn').addEventListener('click', shareStats);
  
  // Report banner button
  document.getElementById('reportBtn').addEventListener('click', reportBanner);
  
  // Help link
  document.getElementById('helpLink').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: 'https://github.com/gunjanjaswal/JustSayNo/wiki' });
  });
  
  // Feedback link
  document.getElementById('feedbackLink').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: 'https://github.com/gunjanjaswal/JustSayNo/issues' });
  });
}

// Share statistics
async function shareStats() {
  try {
    const stats = await chrome.runtime.sendMessage({ type: 'GET_STATS' });
    const monthlyClicks = stats.clicksThisMonth || 0;
    const totalClicks = stats.totalClicks || 0;
    
    // Calculate estimated trackers blocked (rough estimate: 10-50 per banner)
    const estimatedTrackers = totalClicks * 25;
    
    const shareText = `🛡️ JustSayNo protected me from ${estimatedTrackers.toLocaleString()} trackers and clicked "Reject All" ${totalClicks.toLocaleString()} times! Take back your privacy: [extension-link]`;
    
    // Copy to clipboard
    await navigator.clipboard.writeText(shareText);
    
    showToast('Share text copied to clipboard! 📋');
    
    // Optionally open Twitter/social media with pre-filled text
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    chrome.tabs.create({ url: twitterUrl });
  } catch (error) {
    console.error('Failed to share stats:', error);
    showToast('Failed to copy share text', 'error');
  }
}

// Report unhandled banner
async function reportBanner() {
  try {
    // Get current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Inject script to report banner
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        if (typeof window.reportBanner === 'function') {
          window.reportBanner();
        } else {
          alert('Please navigate to a page with a cookie banner to report it.');
        }
      }
    });
    
    showToast('Thank you for reporting! 🚩');
  } catch (error) {
    console.error('Failed to report banner:', error);
    showToast('Failed to report banner', 'error');
  }
}

// Show toast notification
function showToast(message, type = 'success') {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    animation: slideUp 0.3s ease-out;
  `;
  
  document.body.appendChild(toast);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'slideDown 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  @keyframes slideDown {
    from {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
  }
`;
document.head.appendChild(style);
