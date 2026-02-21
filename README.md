# WhatsApp Direct Message

A Chrome extension to send WhatsApp messages directly to any phone number, even if not in your contacts.

## Features

- Send WhatsApp messages to unknown numbers directly from web WhatsApp
- Auto-formats phone numbers (adds country code for 10-digit numbers)
- Phone number history syncs across all your Chrome instances
- Quick access to recent numbers in popup
- Detailed history page with pagination
- Removes `+` and spaces from phone numbers automatically

## Installation

### From Chrome Web Store
[Add to Chrome](https://chrome.google.com/webstore)

### Manual Installation
1. Download source code (zip) from GitHub
2. Unzip the file
3. Open `chrome://extensions/`
4. Enable "Developer mode"
5. Click "Load unpacked"
6. Select the extracted folder

## Usage

1. Click the extension icon in Chrome toolbar
2. Enter a phone number (supports formats: `9885459495`, `+91 9885459495`, `919885459495`)
3. Click "Send Message"
4. Opens WhatsApp API in new tab to start conversation

## Permissions

| Permission | Purpose |
|------------|---------|
| `activeTab` | Get current tab to execute WhatsApp link |
| `scripting` | Inject JavaScript to create and click WhatsApp link |
| `storage` | Save phone history synced across devices |

## Tech Stack

- Plain JavaScript (no frameworks)
- Chrome Extensions Manifest V3
- Chrome Storage Sync API

## Building

```bash
# Install dependencies (if needed)
npm install

# Create distribution zip
npm run zip
```

## Privacy

This extension stores only phone numbers you enter locally in your Chrome browser. Data is synced across your Chrome instances using Chrome's sync storage. We do not collect, transmit, or share any personal information with third parties.

See [Privacy Policy](https://hmd-wa-direct.netlify.app/privacy-policy.html)

## License

MIT License

## Contributing

Pull requests welcome!
