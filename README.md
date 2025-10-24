# 🛡️ JustSayNo - The Actual "Reject All" Button

**Take back your privacy, one click at a time.**

JustSayNo is a Chrome extension that automatically navigates and clicks "Reject All" or "Necessary Only" on cookie banners, instead of just hiding them. No more cookie banner fatigue. No more accidentally accepting tracking scripts.

---

**🔗 Links:**
- **GitHub Repository**: [https://github.com/gunjanjaswal/JustSayNo/](https://github.com/gunjanjaswal/JustSayNo/)
- **Report Issues**: [https://github.com/gunjanjaswal/JustSayNo/issues](https://github.com/gunjanjaswal/JustSayNo/issues)
- **Email**: [hello@gunjanjaswal.me](mailto:hello@gunjanjaswal.me)

---

## ✨ Features

### Core Features
- **🎯 Automatic Rejection**: Automatically detects and clicks "Reject All" buttons on 1,000+ popular cookie banners
- **🔍 Shadow DOM Support**: Works even with complex banners hidden in shadow DOMs
- **⚙️ One-Time Setup**: Just choose your preference once: "Reject All" or "Necessary Only"
- **📊 Trust Badge**: See exactly how many times you've been protected with live statistics
- **🚩 Report Banner**: Found a banner we don't support? Report it with one click

### Viral Features
- **📈 Share Your Stats**: Generate shareable cards showing how many trackers you've blocked
- **🔥 Aggressive Mode (PRO)**: Coming soon - will block known analytics/advertising domains for extra protection
- **🤝 Community-Powered**: Filter lists are constantly updated by the community
- **🎉 Satisfying Feedback**: Green checkmark badge when a banner is successfully rejected

## 🚀 Installation

### From Source (Developer Mode)

1. **Download the Extension**
   ```bash
   git clone https://github.com/gunjanjaswal/JustSayNo.git
   cd JustSayNo
   ```

2. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the `JustSayNo` folder

3. **Complete Setup**
   - The onboarding page will open automatically
   - Choose your preference: "Reject All" or "Necessary Only"
   - You're all set! Browse the web freely.

### From Chrome Web Store
*Coming soon!*

## 📖 How to Use

### Basic Usage
1. **Install the extension** and complete the one-time setup
2. **Browse normally** - JustSayNo works automatically in the background
3. **Check your stats** - Click the extension icon to see how many banners you've rejected

### Advanced Features

#### Share Your Stats
1. Click the extension icon
2. Click "📊 Share My Stats"
3. Your stats are copied to clipboard and Twitter opens with a pre-filled tweet
4. Share with the world! 🌍

#### Report Unhandled Banner
1. Navigate to a page with a cookie banner that wasn't handled
2. Click the extension icon
3. Click "🚩 Report This Banner"
4. The banner info is saved and can be used to update the filter list

#### Enable Aggressive Mode
1. Click the extension icon
2. Toggle "Aggressive Mode"
3. This will also block known tracking scripts even after clicking "Reject"

## 🛠️ Technical Details

### Architecture
- **Manifest V3**: Uses the latest Chrome extension architecture
- **Content Script**: Runs on all pages to detect and handle cookie banners
- **Background Service Worker**: Tracks statistics and manages notifications
- **Filter Lists**: Community-maintained CSS selectors for popular cookie banners

### Supported Cookie Banner Platforms
- OneTrust
- TrustArc
- Cookiebot
- Didomi
- Usercentrics
- Quantcast
- Osano
- Termly
- iubenda
- And 40+ more...

### How It Works
1. **Detection**: Content script monitors the page for cookie banner containers
2. **Identification**: Matches banner elements against filter list selectors
3. **Action**: Clicks the appropriate "Reject" or "Necessary Only" button
4. **Verification**: Confirms banner was dismissed and updates statistics
5. **Feedback**: Shows success badge and optional notification

### Shadow DOM Support
Many modern cookie banners use Shadow DOM to isolate their content. JustSayNo can pierce through Shadow DOMs to find and click reject buttons that other extensions miss.

## 🤝 Contributing

We need your help to make JustSayNo better!

### Report New Banners
Found a cookie banner that JustSayNo doesn't handle? Use the "Report Banner" feature in the extension, or:

1. Open an issue on GitHub
2. Include the website URL
3. Include a screenshot if possible
4. We'll add support ASAP!

### Update Filter Lists
Know CSS? Help us maintain the filter lists:

1. Fork the repository
2. Edit `filters.json`
3. Add new selectors for cookie banner buttons
4. Submit a pull request

### Spread the Word
The best way to contribute is to tell your friends! Share your stats on social media and help others take back their privacy.

## 📊 Statistics

Track your privacy protection:
- **Total Rejections**: Lifetime count of rejected banners
- **Monthly Rejections**: This month's rejections
- **Days Protected**: Days since installation
- **Estimated Trackers Blocked**: Rough estimate based on rejections

## ⚙️ Settings

### User Preference
- **Reject All**: Clicks the "Reject All" button (default)
- **Necessary Only**: Clicks "Necessary Only" or "Essential Only" buttons

### Aggressive Mode (PRO)
Blocks known tracking domains including:
- Google Analytics
- Facebook Pixel
- Advertising networks
- And more...

### Notifications
Toggle whether you want to see notifications when banners are rejected.

## 🔒 Privacy

JustSayNo respects your privacy:
- ✅ No data collection
- ✅ No analytics
- ✅ No external servers
- ✅ All processing happens locally
- ✅ Open source - verify the code yourself

Reported banners are stored locally only. In a production version, these would be sent to a community server to improve the filter lists.

## 🐛 Known Issues

### The "Hydra" Problem
Cookie banners are constantly changing. New designs appear daily. This is why community reporting is crucial. If you find a banner we don't support, please report it!

### Delayed Banners
Some websites load cookie banners after a delay. JustSayNo checks periodically, but there may be a brief moment where the banner is visible.

### False Positives
Rarely, JustSayNo might click the wrong button. If this happens, please report it so we can improve the selectors.

## 📝 Roadmap

- [ ] Chrome Web Store release
- [ ] Firefox support
- [ ] Edge support
- [ ] Safari support
- [ ] Community filter list server
- [ ] Machine learning for banner detection
- [ ] Whitelist for trusted sites
- [ ] Dark mode
- [ ] Multi-language support

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Inspired by privacy-focused browser extensions like uBlock Origin
- Built with love for a more private web
- Thanks to all contributors and banner reporters!

## 📞 Support

- **GitHub Repository**: [https://github.com/gunjanjaswal/JustSayNo/](https://github.com/gunjanjaswal/JustSayNo/)
- **Report Issues**: [https://github.com/gunjanjaswal/JustSayNo/issues](https://github.com/gunjanjaswal/JustSayNo/issues)
- **Email**: [hello@gunjanjaswal.me](mailto:hello@gunjanjaswal.me)

---

**Made with 🛡️ by privacy advocates, for privacy advocates.**

*"The best 'Accept All' button is the one you never have to see."*
