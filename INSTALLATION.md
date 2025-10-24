# 📦 Installation Guide

This guide will walk you through installing JustSayNo Chrome extension.

## Method 1: Load Unpacked (Developer Mode)

This is the current method since the extension is not yet on the Chrome Web Store.

### Step 1: Download the Extension

**Option A: Download ZIP**
1. Go to the GitHub repository
2. Click the green "Code" button
3. Select "Download ZIP"
4. Extract the ZIP file to a location you'll remember (e.g., `Documents/JustSayNo`)

**Option B: Clone with Git**
```bash
git clone https://github.com/yourusername/justsayno.git
cd justsayno
```

### Step 2: Generate Icons

Before loading the extension, you need to create the icon files:

1. Open `icons/generate-icons.html` in your browser
2. The icons will be generated automatically
3. Click each "Download" button (16x16, 48x48, 128x128)
4. Save the downloaded files in the `icons` folder with these exact names:
   - `icon16.png`
   - `icon48.png`
   - `icon128.png`

### Step 3: Load in Chrome

1. **Open Chrome Extensions Page**
   - Type `chrome://extensions/` in the address bar, OR
   - Click the three dots menu → More Tools → Extensions

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

3. **Load the Extension**
   - Click "Load unpacked" button
   - Navigate to the JustSayNo folder
   - Select the folder and click "Select Folder"

4. **Verify Installation**
   - You should see the JustSayNo extension card appear
   - The extension icon should appear in your toolbar
   - If you don't see the icon, click the puzzle piece icon and pin JustSayNo

### Step 4: Complete Setup

1. The onboarding page will open automatically
2. Choose your preference:
   - **Reject All**: Automatically reject all cookies (recommended)
   - **Necessary Only**: Only accept necessary cookies
3. Click "Let's Go! Start Protecting My Privacy"

🎉 **You're all set!** JustSayNo is now protecting your privacy.

## Method 2: Chrome Web Store (Coming Soon)

Once published to the Chrome Web Store, installation will be as simple as:

1. Visit the JustSayNo page on Chrome Web Store
2. Click "Add to Chrome"
3. Confirm the installation
4. Complete the one-time setup

## Verification

To verify JustSayNo is working:

1. **Visit a website with cookie banners**
   - Try: bbc.com, theguardian.com, or any news website
   
2. **Watch for automatic rejection**
   - The cookie banner should disappear automatically
   - The extension icon will show a green checkmark briefly

3. **Check your stats**
   - Click the JustSayNo extension icon
   - You should see your rejection count increase

## Troubleshooting

### Extension Won't Load

**Problem**: Error when loading unpacked extension

**Solutions**:
- Make sure you selected the correct folder (the one containing `manifest.json`)
- Check that all required files are present
- Verify the `manifest.json` file is valid JSON
- Make sure you have the icon files in the `icons` folder

### Icons Not Showing

**Problem**: Extension loads but icons are missing

**Solutions**:
- Generate the icons using `icons/generate-icons.html`
- Make sure icon files are named exactly: `icon16.png`, `icon48.png`, `icon128.png`
- Reload the extension after adding icons

### Extension Not Working on Websites

**Problem**: Cookie banners aren't being rejected

**Solutions**:
- Reload the webpage after installing the extension
- Check the browser console (F12) for any error messages
- Some banners may not be supported yet - use the "Report Banner" feature
- Make sure the extension has permission to run on the website

### Onboarding Page Doesn't Open

**Problem**: Setup page doesn't appear after installation

**Solutions**:
- Manually open it: Right-click extension icon → Options
- Or navigate to: `chrome-extension://[extension-id]/onboarding.html`
- You can also configure settings from the popup

## Updating the Extension

### Manual Updates (Developer Mode)

1. **Pull latest changes** (if using Git)
   ```bash
   cd justsayno
   git pull origin main
   ```

2. **Reload the extension**
   - Go to `chrome://extensions/`
   - Find JustSayNo
   - Click the refresh icon

### Automatic Updates (Chrome Web Store)

Once on the Chrome Web Store, updates will be automatic.

## Uninstalling

If you need to uninstall JustSayNo:

1. Go to `chrome://extensions/`
2. Find JustSayNo
3. Click "Remove"
4. Confirm removal

Your statistics and settings will be deleted.

## Permissions Explained

JustSayNo requests these permissions:

- **storage**: To save your preferences and statistics locally
- **activeTab**: To interact with cookie banners on the current tab
- **host_permissions (<all_urls>)**: To work on all websites

**Privacy Note**: JustSayNo does NOT:
- Collect your browsing history
- Send data to external servers
- Track your activity
- Access your personal information

All processing happens locally on your device.

## Getting Help

If you encounter issues:

1. **Check the FAQ** in README.md
2. **GitHub Repository**: https://github.com/gunjanjaswal/JustSayNo/
3. **Report Issues**: https://github.com/gunjanjaswal/JustSayNo/issues
4. **Email Support**: hello@gunjanjaswal.me

When reporting issues, include:
- Your Chrome version
- Extension version
- Steps to reproduce the problem
- Any error messages from the console

## Next Steps

After installation:

- ✅ Browse normally - JustSayNo works automatically
- ✅ Check your stats regularly
- ✅ Report unhandled banners to help improve the extension
- ✅ Share your stats on social media
- ✅ Tell your friends about JustSayNo!

---

**Need more help?** Open an issue on GitHub or check the documentation.
