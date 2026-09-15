---
title: YT Videos - AdBlocker Downloader and Music
document: Privacy Policy
subtitle: A product of Idea Forge
effectiveDate: 14 September 2026
lastUpdated: 14 September 2026
---
Applies to the YT Videos application for Windows, distributed through the Microsoft Store (Product ID `9PG1Z4WJM4WG`). The application has no supporting online service.

> ### The Short Version
>
> YT Videos has no user accounts, no analytics, and no database. There is no server operated by Idea Forge anywhere in the picture. The application has no backend at all.
>
> Everything the app remembers — your theme, your download quality, your saved videos, and your YouTube sign-in — stays on your own computer. None of it is sent to Idea Forge, because there is nowhere for it to be sent.
>
> Three kinds of traffic may leave your device, and none of them is sent to our servers:
>
> - The app displays YouTube, YouTube Music, and YouTube Kids in its browser window. Your connection to those services is made directly with Google, exactly as it would be in a normal web browser.
> - The ad blocker's filter lists are retrieved by uBlock Origin Lite from their own publishers.
> - The Microsoft Store handles purchases, licence checks, and application update checks.

YT Videos is an independent third-party desktop utility developed by Idea Forge. It is not affiliated with, authorized, maintained, sponsored, or endorsed by Google LLC, YouTube, or any of their affiliates. YouTube, YouTube Music, and YouTube Kids are registered trademarks of Google LLC.

## 1. Who we are

YT Videos is published by Idea Forge ("we", "us", "our").

We do not publish a support email address. Everything reaches us through one channel, so nothing gets lost:

**Support & Feedback:**

 [Support & Feedback](/support)

Use the Support & Feedback form on that page for privacy questions, data requests, bug reports, and anything else. It is the same form the app links to from *Settings → Support & feedback*, and it is the fastest way to reach a person.

## 2. What is stored on your device

The app saves the following on your computer. None of it is transmitted to us.

**Appearance preference**

- **What:** Whether you chose the light or the dark theme.
- **Why:** So the app opens in the theme you picked.
- `Key: yt-app.theme`

**Download quality**

- **What:** The maximum video quality selected for new downloads.
- **Why:** So the Downloader does not ask again on every save.
- `Key: yt-app.downloadQuality`

**Background control preference**

- **What:** Whether notification-area media controls are enabled.
- **Why:** So the choice survives restarting the app.
- `Key: yt-app.backgroundControl`

**Microsoft Store licence state**

- **What:** A locally cached copy of which add-ons your Microsoft account is licensed to use.
- **Why:** So paid features keep working when your device is offline.
- `Storage: Windows Store licensing cache`

**Downloaded videos**

- **What:** Media files you chose to save through the Downloader.
- **Why:** Kept wherever you asked the Downloader to save them.
- `Storage: Your local filesystem`

## 3. What is stored in your browser profile

Because the app is a desktop client for YouTube, it uses the Microsoft Edge WebView2 control to render YouTube's web pages. That browser engine creates a dedicated user data folder on your computer:

`%LOCALAPPDATA%\IdeaForge\YT-AppForYoutube\EBWebView`

Inside that folder, the browser engine stores:

- YouTube sign-in session cookies, so you stay signed in across restarts.
- YouTube preferences, watch history, and playlists stored by YouTube itself.
- Browser caches, temporary files, and site storage created while browsing.

Idea Forge cannot read this data, does not inspect it, and does not transmit it. It is created by and for the WebView2 engine and Google's services, exactly as if you were using Microsoft Edge directly.

Clearing the app's cache in *Settings → Privacy → Clear browsing data*, or uninstalling the app, removes this folder.

## 4. What leaves your device

The app has no telemetry, no tracking pixels, and no crash reporting service. It makes no calls to any server operated by Idea Forge.

The only traffic that leaves your computer is:

### Direct connections to Google and YouTube

When you open the app, it loads YouTube's pages. That connection is between your computer and Google's servers.

- It carries your IP address, browser headers, and whatever cookies YouTube has set in your session.
- It is governed entirely by [Google's Privacy Policy](https://policies.google.com/privacy).
- Idea Forge is never a proxy, intermediary, or observer in that communication.

### Ad-block filter list updates

The app bundles uBlock Origin Lite, an open-source content blocker.

- To keep blocking rules effective, uBlock Origin Lite periodically fetches updated filter lists from its authors' repositories.
- These requests are anonymous HTTP GET requests for static text files. They contain no identifiers, no personal data, and no information about which videos you watch.

### Microsoft Store communications

Windows itself contacts the Microsoft Store on behalf of the app to:

- Verify your licence for paid features.
- Check for and download application updates.
- Process in-app purchases.

These requests are handled entirely by Windows and Microsoft, under the [Microsoft Privacy Statement](https://privacy.microsoft.com/privacystatement). Idea Forge never receives your payment information, credit card numbers, billing address, or full name from Microsoft.

## 5. Downloads

The app includes a video downloader powered by `yt-dlp` and `FFmpeg`, bundled locally.

- All downloading and format conversion takes place entirely on your device.
- No video URL, video title, or downloaded file is ever sent to Idea Forge.
- Downloaded files are saved to your chosen folder on your local drive and are never uploaded anywhere.

## 6. Accounts

You do not need an Idea Forge account to use the app. There is no sign-up form, no username, and no password.

If you sign in to YouTube inside the app, that sign-in is between you and Google. Idea Forge never sees, handles, or stores your Google credentials.

## 7. Analytics and tracking

- **No Idea Forge telemetry:** We do not track what you watch, what you search for, what you download, how long you use the app, or what buttons you click.
- **No third-party trackers:** The app shell contains no Google Analytics, no Mixpanel, no Sentry, no Facebook SDK, and no advertising network SDKs.
- **YouTube's own tracking:** YouTube's web pages running inside the app do what they normally do in a browser. That activity is governed by Google's policies, not ours. Where your licence allows the ad blocker, common advertising and tracking scripts are blocked by uBlock Origin Lite rules locally.

## 8. Purchases and licensing

All in-app purchases are handled by the Microsoft Store.

- We do not see your credit card number, bank details, or billing address.
- Microsoft informs the app whether the current Microsoft account holds an active entitlement for a given feature (for example, monthly, annual, or lifetime Premium).
- The app caches that licence entitlement locally so you do not lose access when offline.
- When you open the store page inside the app, the app queries the Microsoft Store API to display:
- Whether the current account already owns each add-on.
- Current prices for the available add-ons, in your local currency.
- Whether an application update is available or pending.

Redeeming a promotional code opens Microsoft's own redemption page and is handled entirely by Microsoft. The application only reads the resulting licence state back from Windows afterwards; it never decides for itself that a code was good.

Reference: [Microsoft Privacy Statement](https://privacy.microsoft.com/privacystatement).

## 9. Children

The application offers YouTube Kids as one of its destinations. YouTube Kids is Google's own service and is governed by Google's policies.

The application itself is a general-purpose viewer. It collects no personal information from users of any age, and it requires no account with Idea Forge. Parents and guardians should be aware that ad blocking, downloads, and the other paid features are purchased and managed through the Microsoft Store account signed in on the device.

## 10. No backend and no server logs

This application has no server component operated by Idea Forge. There is:

- No Idea Forge API for the application to call.
- No Idea Forge database.
- No backend account system.
- No operational server log recording your use of the application.

## 11. Your rights, and how to use them

Your data stays on your device, so you are in direct control of it:

- **Access and portability:** Everything the app stores is in your Windows user profile.
- **Correction and deletion:** Change the relevant preferences in the app's Settings, or uninstall the app to remove the rest.
- **Sign-out:** Sign out of YouTube inside the app, exactly as you would in a browser.
- **Purchases and billing:** Manage subscriptions and purchases through your Microsoft account at [account.microsoft.com/services](https://account.microsoft.com/services).

If you are somewhere that grants you statutory rights over personal data (GDPR, UK GDPR, CCPA, and similar), those rights apply to us too. Since we hold no personal data about you on any system of ours, in most cases there will be nothing for us to produce or erase — send the request through the Support & Feedback form in Section 1 and we will confirm that in writing and act on anything that does apply.

## 12. Security

The application relies on the security mechanisms Windows, the Microsoft Store, and encrypted connections already provide:

- Application data lives in your Windows user profile, protected by your operating system account.
- Browser profile data, including YouTube cookies and site data, is protected by Windows and Microsoft Edge WebView2.
- Network connections use HTTPS. The application refuses to navigate its browser view to a non-HTTPS address.
- Packages installed from the Microsoft Store are signed and integrity-checked by Windows.

No system is perfectly secure. Anyone with access to your unlocked Windows account has access to whatever that account can read, including this app's data.

## 13. Third-party components

The application bundles open-source software, including:

- `uBlock Origin Lite`
- `yt-dlp`
- `FFmpeg`

Licence notices, the applicable licence texts, and the version of each bundled component are available inside the application under *Settings → License*.

## 14. Changes to this policy

We may update this policy as the app changes. The effective date at the top always reflects the current version, and material changes — in particular any change to what data leaves your device — will be called out in the release notes on the Microsoft Store listing.

## 15. Contact

- **Support & Feedback:** [Support & Feedback](/support)
- **Terms of Service:** [Terms of Service](/products/yt-app-for-youtube/terms-of-service)
- **Publisher:** Idea Forge
- **Microsoft Store Listing:** [https://apps.microsoft.com/detail/9PG1Z4WJM4WG](https://apps.microsoft.com/detail/9PG1Z4WJM4WG)

> YT Videos is an independent third-party desktop utility developed by Idea Forge. It is not affiliated with, authorized, maintained, sponsored, or endorsed by Google LLC, YouTube, or any of their affiliates. YouTube, YouTube Music, and YouTube Kids are registered trademarks of Google LLC.
