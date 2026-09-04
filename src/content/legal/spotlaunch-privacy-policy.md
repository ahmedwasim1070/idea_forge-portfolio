---
title: SpotLaunch — Social Media Browser
document: Privacy Policy
subtitle: A product of Idea Forge
effectiveDate: 19 August 2026
lastUpdated: 19 August 2026
---
Applies to the SpotLaunch desktop application for Windows, distributed through the Microsoft Store (Product ID `9NGC63JNJ6TG`).

> ### The Short Version
>
> SpotLaunch has no user accounts, no analytics, and no server. Everything the app remembers — your favourites, bookmarks, and preferences — stays on your own computer and is never sent to us. We do not sell, rent, or share personal information with anyone.
>
> Three things reach outside your computer, and each is described in full below:
>
> - The app fetches icons for websites you bookmark so they can be displayed on your launcher.
> - The app connects to the Microsoft Store to verify your Premium license if you purchase an add-on.
> - The app opens links and applications you explicitly tell it to open.

## 1. Who we are

SpotLaunch is published by Idea Forge ("we", "us", "our").

We do not publish a support email address. Everything reaches us through one channel, so nothing gets lost:

**Support & Feedback:**

 [Support & Feedback](/support)

Use the Support & Feedback form on that page for privacy questions, data requests, bug reports, and anything else. It is the same form the app links to from *Settings → Support & Feedback*, and it is the fastest way to reach a person.

## 2. What is stored on your device

The app saves the following in its local storage on your computer. None of it is transmitted to us.

**Favourites**

- **What:** Which apps and sites you have pinned to Favourites.
- **Why:** So your pins survive restarting the app.
- `Storage key: favorites.json`

**Bookmarks**

- **What:** The name and address of each site you bookmarked.
- **Why:** So your saved sites are available to launch.
- `Storage key: bookmarks.json`

**Recent launches**

- **What:** The last 10 things you launched.
- **Why:** To provide quick access to your most frequently used items.
- `Storage key: recent.json`

**Preferences**

- **What:** Your app settings and preferences.
- **Why:** So the app behaves the way you configured it.
- `Storage key: settings.json`

**Rating-prompt state**

- **What:** Launch count and whether you have reviewed the app.
- **Why:** So the app asks about a Store rating at most once, then leaves you alone.
- `Storage key: review.json`

**App and Web Icons**

- **What:** Icons read from installed applications and bookmarked sites.
- **Why:** Saved as images so they do not have to be read from your disk or downloaded again.
- `Storage keys: AppIcons folder, WebIcons folder`

**Crash logs**

- **What:** The technical details of an unexpected error.
- **Why:** So a problem can be diagnosed. It stays on your PC and is never sent anywhere automatically.
- `Storage key: crash.log`

SpotLaunch also reads your Start Menu to list the applications you have installed. That list is built fresh each time the app starts, is held only in memory, and is never written to a file or transmitted.

*Uninstalling the app removes all of this data entirely. You can also delete it at any time from Settings → Clear all local data.*

## 3. What we do not collect

We would rather be specific than reassuring, so, concretely:

- **No accounts:** There is no sign-up, no login to us, and no profile.
- **No analytics or telemetry:** The app contains no analytics SDK, no crash reporter, no usage tracking, no advertising identifier, and no third-party tracker of any kind.
- **No payment information:** Purchases are handled by the Microsoft Store. We never see your card, billing address, or Microsoft account details.

## 4. What leaves your PC

### 4.1 Icons for sites you bookmark

When you bookmark a site, SpotLaunch fetches its icon the same way a browser would. For that site's address only, it requests:

1. The page itself, to read the icon it declares.
2. `https://[that-site]/favicon.ico`
3. `https://icons.duckduckgo.com/ip3/[that-site].ico`, if neither of the first two worked.

These requests go to the site you bookmarked and, as a last resort, to DuckDuckGo's icon service. They contain the domain name and a standard browser user-agent string — nothing about you, nothing about your other bookmarks, and nothing about your installed applications. They happen once per site; afterwards the icon is read from the local cache. If you never bookmark a site, SpotLaunch makes no network requests of this kind.

### 4.2 Purchases and Premium

Premium is sold as a Microsoft Store add-on. When you buy it, or when SpotLaunch checks whether you already own it, that conversation is between your PC and the Microsoft Store using Windows' own Store services. We receive nothing but a yes-or-no answer to whether you hold an active license.

### 4.3 Links you choose to open

Support & feedback, Terms of Service, Privacy Policy, and Store links open in your browser or the Microsoft Store app. Nothing is sent when you open one beyond the ordinary act of visiting that page. The same applies to any app or site you launch from SpotLaunch.

## 5. Permissions the app declares

SpotLaunch declares the `internetClient` capability in Windows. It is used for exactly one thing: fetching the site icons described in Section 4.1. It is not used for analytics, updates, or any communication with Idea Forge.

## 6. Children

SpotLaunch is a general-purpose utility and is not directed at children. We do not knowingly collect personal information from children. Because the app collects no personal information at all, there is nothing for us to hold, disclose, or delete.

## 7. Your rights, and how to use them

Your data stays on your device, so you are in direct control of it:

- **Access and portability:** Everything the app stores is in your Windows user profile, in plain readable form.
- **Correction and deletion:** Edit or delete bookmarks and history inside the app. Pressing "Clear all local data" in Settings or uninstalling the app removes the rest.
- **Purchases and billing:** Manage at [account.microsoft.com/services](https://account.microsoft.com/services).

If you are somewhere that grants you statutory rights over personal data, those rights apply to us too. Since we hold no personal data about you on our systems, in most cases there will be nothing for us to produce or erase, but you may contact us through the Support form in Section 1.

## 8. Security

App data lives in your Windows user profile, protected by your operating system account. Packages installed from the Microsoft Store are signed and integrity-checked by Windows. No system is perfectly secure. Anyone with access to your unlocked Windows account has access to whatever that account can read, including this app's data.

## 9. Changes to this policy

We may update this policy as the app changes. The effective date at the top always reflects the current version, and material changes will be called out in the release notes on the Microsoft Store listing.

## 10. Contact

- **Support & Feedback:** [Support & Feedback](/support)
- **Terms of Service:** [https://sites.google.com/view/ideaforge-web/terms-of-service](https://sites.google.com/view/ideaforge-web/terms-of-service)
- **Publisher:** Idea Forge
- **Microsoft Store Listing:** [https://apps.microsoft.com/detail/9NGC63JNJ6TG](https://apps.microsoft.com/detail/9NGC63JNJ6TG)

> Idea Forge is an independent developer based in Pakistan. SpotLaunch is not affiliated with, endorsed by, or sponsored by Microsoft Corporation.
