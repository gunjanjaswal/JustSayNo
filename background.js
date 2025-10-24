// JustSayNo Background Service Worker
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    // First-time setup
    console.log('[JustSayNo] Extension installed!');
    
    // Open onboarding page
    chrome.tabs.create({
      url: chrome.runtime.getURL('onboarding.html')
    });
    
    // Initialize storage
    await chrome.storage.sync.set({
      userPreference: 'reject',
      aggressiveMode: false,
      showNotifications: true
    });
    
    await chrome.storage.local.set({
      totalClicks: 0,
      clicksThisMonth: 0,
      reportedBanners: [],
      installDate: new Date().toISOString()
    });
  } else if (details.reason === 'update') {
    console.log('[JustSayNo] Extension updated to version', chrome.runtime.getManifest().version);
  }
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'BANNER_REJECTED') {
    handleBannerRejected(message, sender.tab);
  } else if (message.type === 'REPORT_BANNER') {
    handleBannerReport(message.data);
  } else if (message.type === 'GET_STATS') {
    getStats().then(sendResponse);
    return true; // Keep channel open for async response
  }
});

// Handle successful banner rejection
async function handleBannerRejected(message, tab) {
  console.log('[JustSayNo] Banner rejected on:', message.url);
  
  // Update badge
  try {
    const result = await chrome.storage.local.get(['clicksThisMonth']);
    const count = result.clicksThisMonth || 0;
    
    // Show temporary success badge
    await chrome.action.setBadgeText({
      text: '✓',
      tabId: tab?.id
    });
    
    await chrome.action.setBadgeBackgroundColor({
      color: '#10b981',
      tabId: tab?.id
    });
    
    // Clear badge after 3 seconds
    setTimeout(() => {
      chrome.action.setBadgeText({ text: '', tabId: tab?.id });
    }, 3000);
    
    // Show notification if enabled
    const settings = await chrome.storage.sync.get(['showNotifications']);
    if (settings.showNotifications) {
      chrome.notifications?.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'JustSayNo',
        message: `Cookie banner rejected! Total this month: ${count}`,
        priority: 0
      });
    }
  } catch (error) {
    console.error('[JustSayNo] Error handling banner rejection:', error);
  }
}

// Handle banner report
async function handleBannerReport(data) {
  console.log('[JustSayNo] Banner reported:', data.url);
  
  try {
    const result = await chrome.storage.local.get(['reportedBanners']);
    const reportedBanners = result.reportedBanners || [];
    
    reportedBanners.push({
      ...data,
      reportedAt: new Date().toISOString()
    });
    
    // Keep only last 50 reports
    if (reportedBanners.length > 50) {
      reportedBanners.shift();
    }
    
    await chrome.storage.local.set({ reportedBanners });
    
    // In a real implementation, this would send to a server
    console.log('[JustSayNo] Report saved locally. Total reports:', reportedBanners.length);
  } catch (error) {
    console.error('[JustSayNo] Error saving report:', error);
  }
}

// Get statistics
async function getStats() {
  try {
    const local = await chrome.storage.local.get([
      'totalClicks',
      'clicksThisMonth',
      'lastClick',
      'installDate',
      'reportedBanners'
    ]);
    
    const sync = await chrome.storage.sync.get([
      'userPreference',
      'aggressiveMode',
      'showNotifications'
    ]);
    
    return {
      ...local,
      ...sync
    };
  } catch (error) {
    console.error('[JustSayNo] Error getting stats:', error);
    return {};
  }
}

// Reset monthly stats (could be triggered by a cron job)
async function resetMonthlyStats() {
  try {
    await chrome.storage.local.set({
      clicksThisMonth: 0
    });
    console.log('[JustSayNo] Monthly stats reset');
  } catch (error) {
    console.error('[JustSayNo] Error resetting monthly stats:', error);
  }
}

// Check if we need to reset monthly stats
async function checkMonthlyReset() {
  try {
    const result = await chrome.storage.local.get(['lastResetDate']);
    const lastReset = result.lastResetDate ? new Date(result.lastResetDate) : new Date(0);
    const now = new Date();
    
    // Reset if it's a new month
    if (lastReset.getMonth() !== now.getMonth() || lastReset.getFullYear() !== now.getFullYear()) {
      await resetMonthlyStats();
      await chrome.storage.local.set({
        lastResetDate: now.toISOString()
      });
    }
  } catch (error) {
    console.error('[JustSayNo] Error checking monthly reset:', error);
  }
}

// Run monthly reset check on startup and daily
checkMonthlyReset();
chrome.alarms.create('monthlyReset', { periodInMinutes: 1440 }); // Check daily

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'monthlyReset') {
    checkMonthlyReset();
  }
});

console.log('[JustSayNo] Background service worker initialized');
