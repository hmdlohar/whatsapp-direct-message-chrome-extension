# Chrome Web Store Listing

## Basic Info
- **Title**: WhatsApp Direct Message
- **Description (Short)**: Send WhatsApp messages to any number directly
- **Description (Extended)**: 
  Send WhatsApp messages directly to any phone number, even if not in your contacts. Works on web WhatsApp.
  
  Features:
  • Send messages to unknown numbers
  • Auto-formats phone numbers (adds country code)
  • History syncs across all your devices
  • Quick access to recent numbers
  • Detailed history with pagination

- **Category**: Productivity
- **Language**: English

---

## Single Purpose
Send WhatsApp messages directly to any phone number from web WhatsApp

---

## Permission Justification

| Permission | Justification |
|------------|---------------|
| **activeTab** | Used to get the current active tab to inject and execute the WhatsApp message link |
| **scripting** | Used to inject JavaScript that creates and clicks the WhatsApp API link |
| **storage** | Used to save phone number history and last entered number locally, synced across user's Chrome instances |

---

## Remote Code
- **Are you using remote code?** No

---

## Data Usage Disclosure

### What user data is collected?
- Personally identifiable information (phone numbers)

### Certifications
- [x] I do not sell or transfer user data to third parties, apart from the approved use cases
- [x] I do not use or transfer user data for purposes that are unrelated to my item's single purpose
- [x] I do not use or transfer user data to determine creditworthiness or for lending purposes

---

## Privacy Policy

### Privacy Policy URL
Host on GitHub Pages or your website. Required URL field.

### Privacy Policy Content
```
WhatsApp Direct Message Extension

WhatsApp Direct Message extension stores your phone number history and preferences locally using Chrome's sync storage. This data is synced across your Chrome instances for your convenience.

We do not collect, transmit, or share any personal information with third parties. The phone numbers you enter are only used to generate WhatsApp message links.

For any privacy concerns, please contact the developer.
```

---

## Screenshots
Place in `preview/` folder (1280x800):
- screenshot-1.png - Main popup showing phone input
- screenshot-2.png - History dropdown visible
- screenshot-3.png - Options page with history

## Promo Images (Optional)
- small-promo.png (440x280)
- marquee-promo.png (1400x560)

---

## Publishing Steps
1. Go to Chrome Web Store Developer Dashboard
2. Upload wa-direct.zip
3. Fill in store listing details (use this document)
4. Submit for review
