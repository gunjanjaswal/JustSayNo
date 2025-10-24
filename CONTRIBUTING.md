# Contributing to JustSayNo

Thank you for your interest in contributing to JustSayNo! This document provides guidelines for contributing to the project.

## 🤝 How to Contribute

### Reporting Unhandled Cookie Banners

The most valuable contribution is reporting cookie banners that JustSayNo doesn't handle yet.

**Using the Extension:**
1. Navigate to a page with an unhandled cookie banner
2. Click the JustSayNo extension icon
3. Click "🚩 Report This Banner"
4. The banner information will be saved

**Using GitHub:**
1. Open a new issue with the "Banner Report" template
2. Include:
   - Website URL
   - Screenshot of the cookie banner
   - Browser and extension version
   - Any error messages from the console (F12 → Console)

### Adding New Filter Selectors

If you know CSS selectors, you can directly contribute to the filter list:

1. **Fork the repository**
   ```bash
   git clone https://github.com/gunjanjaswal/JustSayNo.git
   cd JustSayNo
   ```

2. **Edit `filters.json`**
   - Add new selectors to the appropriate arrays:
     - `rejectButtons`: Selectors for "Reject All" buttons
     - `manageButtons`: Selectors for "Manage Settings" buttons
     - `bannerContainers`: Selectors for the banner container itself
     - `shadowDomHosts`: Elements that use Shadow DOM

3. **Test your changes**
   - Load the extension in Chrome (Developer Mode)
   - Visit websites with the cookie banners you're targeting
   - Verify the buttons are clicked correctly

4. **Submit a Pull Request**
   - Describe which cookie banner platform you added support for
   - Include test URLs if possible
   - Reference any related issues

### Code Contributions

#### Setting Up Development Environment

1. **Clone the repository**
   ```bash
   git clone https://github.com/gunjanjaswal/JustSayNo.git
   cd JustSayNo
   ```

2. **Load in Chrome**
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the project folder

3. **Make changes**
   - Edit the relevant files
   - Reload the extension to test changes

#### Code Style Guidelines

- **JavaScript**: Use modern ES6+ syntax
- **Formatting**: 2 spaces for indentation
- **Comments**: Add comments for complex logic
- **Console logs**: Use `[JustSayNo]` prefix for debugging
- **Error handling**: Always use try-catch for async operations

#### File Structure

```
JustSayNo/
├── manifest.json          # Extension manifest
├── content.js            # Content script (runs on web pages)
├── background.js         # Background service worker
├── popup.html/css/js     # Extension popup UI
├── onboarding.html       # First-time setup page
├── filters.json          # Cookie banner selectors
└── icons/                # Extension icons
```

### Feature Requests

Have an idea for a new feature? We'd love to hear it!

1. Check existing issues to avoid duplicates
2. Open a new issue with the "Feature Request" template
3. Describe:
   - The problem you're trying to solve
   - Your proposed solution
   - Any alternatives you've considered
   - How it fits with the extension's goals

### Bug Reports

Found a bug? Help us fix it!

1. Check if the bug has already been reported
2. Open a new issue with the "Bug Report" template
3. Include:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Browser version
   - Extension version
   - Console errors (if any)

## 🎯 Priority Areas

We especially need help with:

1. **Filter List Maintenance**: Adding selectors for new cookie banners
2. **Testing**: Testing on different websites and browsers
3. **Documentation**: Improving README and guides
4. **Translations**: Multi-language support (future)
5. **Icon Design**: Professional icon design

## 📋 Pull Request Process

1. **Create a branch** for your feature/fix
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the code style guidelines

3. **Test thoroughly**
   - Test on multiple websites
   - Check console for errors
   - Verify no regressions

4. **Commit with clear messages**
   ```bash
   git commit -m "Add support for [Cookie Banner Platform]"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then open a Pull Request on GitHub

6. **PR Review**
   - Maintainers will review your PR
   - Address any feedback
   - Once approved, it will be merged!

## 🏆 Recognition

Contributors will be:
- Listed in the README
- Credited in release notes
- Given a shoutout on social media (if desired)

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all.

### Our Standards

- **Be respectful**: Treat everyone with respect
- **Be constructive**: Provide helpful feedback
- **Be collaborative**: Work together towards common goals
- **Be patient**: Remember that everyone is learning

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information

## 📞 Questions?

- **GitHub Repository**: https://github.com/gunjanjaswal/JustSayNo/
- **Report Issues**: https://github.com/gunjanjaswal/JustSayNo/issues
- **Security issues**: Email hello@gunjanjaswal.me

## 🙏 Thank You!

Every contribution, no matter how small, helps make the web more private and user-friendly. Thank you for being part of the JustSayNo community!

---

**Happy Contributing! 🛡️**
