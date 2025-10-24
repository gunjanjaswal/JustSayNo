// JustSayNo Content Script - Automatically rejects cookie banners
(function() {
  'use strict';

  let filters = null;
  let userPreference = 'reject'; // 'reject' or 'necessary'
  let processedBanners = new Set();
  let clickCount = 0;

  // Load filters and user preferences
  async function initialize() {
    try {
      const url = chrome.runtime.getURL('filters.json');
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load filters: ${response.status}`);
      }
      filters = await response.json();
      
      const result = await chrome.storage.sync.get(['userPreference', 'aggressiveMode']);
      userPreference = result.userPreference || 'reject';
      
      console.log('[JustSayNo] Initialized with preference:', userPreference);
    } catch (error) {
      console.error('[JustSayNo] Failed to initialize:', error);
    }
  }

  // Check if element is visible
  function isVisible(element) {
    if (!element) return false;
    
    const style = window.getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
      return false;
    }
    
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  // Find element using multiple selectors
  function findElement(selectors, root = document) {
    for (const selector of selectors) {
      try {
        // Handle pseudo-selectors like :has-text
        if (selector.includes(':has-text')) {
          const text = selector.match(/\('(.+?)'\)/)?.[1];
          if (text) {
            const elements = root.querySelectorAll('button, a');
            for (const el of elements) {
              if (el.textContent.trim().toLowerCase().includes(text.toLowerCase()) && isVisible(el)) {
                return el;
              }
            }
          }
        } else {
          const elements = root.querySelectorAll(selector);
          for (const el of elements) {
            if (isVisible(el)) {
              return el;
            }
          }
        }
      } catch (e) {
        // Invalid selector, skip
        continue;
      }
    }
    return null;
  }

  // Find button by text content (fallback method)
  function findButtonByText(texts, root = document) {
    const buttons = root.querySelectorAll('button, a[role="button"], [role="button"]');
    for (const button of buttons) {
      const buttonText = button.textContent.trim().toLowerCase();
      for (const text of texts) {
        if (buttonText.includes(text.toLowerCase()) && isVisible(button)) {
          console.log('[JustSayNo] Found button by text:', text, button);
          return button;
        }
      }
    }
    return null;
  }

  // Search in shadow DOMs
  function searchShadowDoms(selectors) {
    if (!filters?.shadowDomHosts) return null;
    
    for (const hostSelector of filters.shadowDomHosts) {
      const hosts = document.querySelectorAll(hostSelector);
      for (const host of hosts) {
        if (host.shadowRoot) {
          const element = findElement(selectors, host.shadowRoot);
          if (element) return element;
        }
      }
    }
    return null;
  }

  // Click element with retry
  function clickElement(element, description) {
    if (!element) return false;
    
    try {
      console.log(`[JustSayNo] Clicking ${description}:`, element);
      
      // Try multiple click methods
      element.click();
      
      // Dispatch mouse events for stubborn buttons
      const events = ['mousedown', 'mouseup', 'click'];
      events.forEach(eventType => {
        const event = new MouseEvent(eventType, {
          view: window,
          bubbles: true,
          cancelable: true
        });
        element.dispatchEvent(event);
      });
      
      return true;
    } catch (error) {
      console.error(`[JustSayNo] Failed to click ${description}:`, error);
      return false;
    }
  }

  // Main banner detection and rejection logic
  async function processCookieBanners() {
    if (!filters) {
      await initialize();
      if (!filters) return;
    }

    // Check if banner container exists
    const bannerContainer = findElement(filters.selectors.bannerContainers);
    if (!bannerContainer) {
      // Also check shadow DOMs
      const shadowBanner = searchShadowDoms(filters.selectors.bannerContainers);
      if (!shadowBanner) return;
    }

    // Avoid processing the same banner multiple times
    const bannerId = bannerContainer?.id || bannerContainer?.className || 'unknown';
    if (processedBanners.has(bannerId)) return;

    console.log('[JustSayNo] Cookie banner detected!', bannerContainer);

    // Try to find and click reject button directly
    let rejectButton = findElement(filters.selectors.rejectButtons);
    if (!rejectButton) {
      rejectButton = searchShadowDoms(filters.selectors.rejectButtons);
    }
    
    // Fallback: search by text content
    if (!rejectButton) {
      rejectButton = findButtonByText([
        'reject all', 'reject', 'decline all', 'decline', 
        'deny all', 'deny', 'no thanks', 'necessary only',
        'essential only', 'i decline'
      ], bannerContainer || document);
    }

    if (rejectButton) {
      if (clickElement(rejectButton, 'Reject button')) {
        processedBanners.add(bannerId);
        clickCount++;
        await updateStats();
        notifySuccess();
        return;
      }
    } else {
      console.log('[JustSayNo] No reject button found. Available buttons:', 
        Array.from((bannerContainer || document).querySelectorAll('button')).map(b => b.textContent.trim()));
    }

    // If no direct reject button, try clicking manage/settings first
    let manageButton = findElement(filters.selectors.manageButtons);
    if (!manageButton) {
      manageButton = searchShadowDoms(filters.selectors.manageButtons);
    }

    if (manageButton) {
      console.log('[JustSayNo] Clicking manage button first...');
      clickElement(manageButton, 'Manage button');
      
      // Wait for settings panel to appear, then try reject again
      setTimeout(async () => {
        let rejectButton = findElement(filters.selectors.rejectButtons);
        if (!rejectButton) {
          rejectButton = searchShadowDoms(filters.selectors.rejectButtons);
        }
        
        if (rejectButton && clickElement(rejectButton, 'Reject button (after manage)')) {
          processedBanners.add(bannerId);
          clickCount++;
          await updateStats();
          notifySuccess();
        }
      }, 500);
    }
  }

  // Update statistics
  async function updateStats() {
    try {
      const result = await chrome.storage.local.get(['totalClicks', 'clicksThisMonth']);
      const totalClicks = (result.totalClicks || 0) + 1;
      const clicksThisMonth = (result.clicksThisMonth || 0) + 1;
      
      await chrome.storage.local.set({
        totalClicks,
        clicksThisMonth,
        lastClick: new Date().toISOString()
      });
      
      console.log('[JustSayNo] Stats updated:', { totalClicks, clicksThisMonth });
    } catch (error) {
      console.error('[JustSayNo] Failed to update stats:', error);
    }
  }

  // Notify background script of success
  function notifySuccess() {
    chrome.runtime.sendMessage({
      type: 'BANNER_REJECTED',
      url: window.location.href,
      timestamp: Date.now()
    }).catch(() => {
      // Ignore errors if background script isn't ready
    });
  }

  // Report unhandled banner
  window.reportBanner = function() {
    const bannerInfo = {
      url: window.location.href,
      timestamp: Date.now(),
      html: document.body.innerHTML.substring(0, 5000) // First 5000 chars
    };
    
    chrome.runtime.sendMessage({
      type: 'REPORT_BANNER',
      data: bannerInfo
    });
    
    alert('Thank you! This banner has been reported. Our community will work on adding support for it.');
  };

  // Initialize and start observing
  initialize().then(() => {
    // Initial check
    processCookieBanners();
    
    // Watch for dynamically loaded banners
    const observer = new MutationObserver((mutations) => {
      // Debounce: only check after mutations settle
      clearTimeout(observer.timeout);
      observer.timeout = setTimeout(processCookieBanners, 300);
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Also check periodically for stubborn banners
    setInterval(processCookieBanners, 2000);
  });

  console.log('[JustSayNo] Content script loaded');
})();
