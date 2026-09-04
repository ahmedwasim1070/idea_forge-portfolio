---
title: GMeet — Video Calls and Meetings
document: Privacy Policy
subtitle: A product of Idea Forge
effectiveDate: 8 August 2026
lastUpdated: 8 August 2026
---
Applies to the GMeet Desktop application for Windows, distributed through the Microsoft Store (Product ID `9PHKS01R0C0B`), and to the supporting online service the application uses.

> ### The Short Version
>
> GMeet has no user accounts, no analytics, and no database. Everything the app remembers — your meetings, your name, your preferences — stays on your own computer and is never sent to us. We do not sell, rent, or share personal information with anyone.
>
> Three things reach outside your computer, and each is described in full below:
>
> - The app can open Google Meet in its own window, where you sign in to Google directly, on Google's pages.
> - The app can optionally connect to your Google Calendar, only if you deliberately sign in and grant permission.
> - The app downloads virtual background images from our server when you ask it to.

GMeet is an independent product. It is not affiliated with, endorsed by, or sponsored by Google LLC. "Google", "Google Meet", and "Google Calendar" are trademarks of Google LLC. "GMeet" is used only as a short descriptor of the service the app helps you reach.

## 1. Who we are

GMeet is published by Idea Forge ("we", "us", "our").

We do not publish a support email address. Everything reaches us through one channel, so nothing gets lost:

**Support & Feedback:**

 [Support & Feedback](/support)

Use the Support & Feedback form on that page for privacy questions, data requests, bug reports, and anything else. It is the same form the app links to from *Settings → Support & Feedback*, and it is the fastest way to reach a person.

## 2. What is stored on your device

The app saves the following in its local storage on your computer. None of it is transmitted to us.

**Scheduled meetings**

- **What:** Name, date and time, link, and status.
- **Why:** So your schedule and reminders survive restarting the app.
- `Key: scheduledMeetings`

**Display name**

- **What:** The display name you type into the greeting.
- **Why:** So the app can greet you by name.
- `Key: userName`

**Rating-prompt state**

- **What:** Launch count, install date, and whether you rated or dismissed.
- **Why:** So the app asks about a Store rating at most once, then leaves you alone.
- `Key: reviewPrompt.v1`

**Dismissed tips**

- **What:** Tips you dismissed permanently.
- **Why:** So a tip you silenced stays silenced.
- `Key: hiddenTipTypes`

**Google connection details**

- **What:** Google connection information, only if you connect Calendar.
- **Why:** So you are not asked to sign in again on every launch.
- `Keys: google.tokens.v1, google.account.v1, google.pendingLogin.v1`

**Google cookies**

- **What:** Cookies Google sets inside the in-app meeting window.
- **Why:** So your Google sign-in persists between meetings, exactly as it would in a browser.
- **Storage:** The app's own WebView2 browser profile, encrypted at rest by Windows.

*Uninstalling the app removes all of it.*

## 3. What we do not collect

We would rather be specific than reassuring, so, concretely:

- **No accounts:** There is no sign-up, no login to us, and no profile.
- **No analytics or telemetry:** The app contains no analytics SDK, no crash reporter, no usage tracking, no advertising identifier, and no third-party tracker of any kind.
- **No meeting content:** The app never records, transcribes, stores, or transmits the audio, video, chat, or any other content of a Google Meet call. Your call runs directly between you and Google.
- **No passwords:** You sign in to Google on Google's own pages. Your password is never seen, handled, or stored by this app.
- **No payment information:** Purchases are handled by the Microsoft Store. We never see your card, billing address, or Microsoft account details.
- **No Google profile data:** Outside the optional Calendar connection described below, the app never asks Google who you are, and never displays your name, email address, or picture.

## 4. Google account data

### 4.1 The in-app meeting window

Premium users can open Google Meet in a dedicated application window instead of a browser. That window loads Google's own website; sign-in, two-step verification, and sign-out all happen there, on Google's pages.

- The app injects nothing into Google's pages and cannot read their contents.
- The app knows only the web address the window is currently on, which it uses to tell whether you are on a sign-in page, in a meeting, or the call has ended. That address is not transmitted anywhere.
- The window is restricted to Google's own domains (`google.com`, `youtube.com`, `gstatic.com`, and their subdomains). Any other address is refused and the window closes.
- Cookies Google sets there are stored in the app's own browser profile on your computer, encrypted by Windows, in the same way any browser stores them. Signing out from Settings ends that session on Google's side.

### 4.2 The optional Google Calendar connection

The app includes a Google Calendar connection that is off by default and marked "Coming soon". It makes no network request at all unless you deliberately start it, and in the currently published release it is limited to development builds.

If and when you use it:

- **What is requested:** The `openid`, `userinfo.email`, and `https://www.googleapis.com/auth/calendar.events` scopes — the minimum needed to read, and in a future release write, the calendar events this app creates. We do not request your full calendar list, contacts, files, or mail.
- **What is received:** An access token, a refresh token, and your email address, returned by Google after you approve its consent screen.
- **Where tokens go:** Tokens are stored in your device's local storage. Our server never stores them. The backend is stateless — no database, no session store, no user record. It exists only so the Google client secret does not have to ship inside the application; it forwards your request to Google and keeps nothing.
- **What is done with calendar data:** The current release only reads upcoming events, to confirm the connection works. It shows a count and the next event's title. It writes nothing to your calendar.
- **How to disconnect:** Use the disconnect option in the app, which revokes the token with Google and deletes the local copy. You can also revoke access permanently at any time via [Google Account Permissions](https://myaccount.google.com/permissions).

### 4.3 Limited Use disclosure

GMeet use and transfer of information received from Google APIs adheres to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements.

Google user data obtained through this app is used only to provide and improve the features described in this policy. It is never sold, never transferred to third parties except as needed to provide those features or to comply with law, never used for advertising, and never read by a human except with your explicit consent, for security purposes, to comply with applicable law, or where the data has been aggregated and anonymised.

## 5. Camera and microphone

The application declares the webcam and microphone device capabilities in Windows, because a Google Meet call needs them.

- The app itself never opens your camera or microphone and never asks for them on its own initiative.
- Google Meet asks when it needs them, and the app answers that request automatically only for `meet.google.com`, and only for camera and microphone. Every other permission request, from every other page — notifications, location, clipboard access — is denied outright.
- No audio or video reaches us. The stream is between your computer and Google.
- If Windows' own per-app privacy settings are blocking a device, the app shows a notice and can open the relevant Windows Settings page. Only you can grant that permission; an application is not permitted to grant it to itself.
- Screen sharing is not enabled in the in-app meeting window.

## 6. Clipboard

While the app's window is visible, it periodically checks your clipboard for Google Meet links and meeting codes only, so it can offer to join a link you have just copied.

- The check runs locally, on your computer.
- Clipboard contents are never transmitted, logged, or stored. Anything that is not a Meet link or code is discarded immediately.
- The check pauses whenever the app's window is hidden.

## 7. Virtual backgrounds

Gallery previews are bundled inside the app and need no network access to display. When you press download, the app requests that one full-size image from our content endpoint and saves it wherever you choose.

That is an ordinary web request and, like any web request, it necessarily reveals your IP address to the hosting provider (Netlify). We attach no identifier to it and do not use these requests to build a profile.

## 8. Microsoft Store

Purchases, subscriptions, trials, renewals, refunds, and cancellations are handled entirely by the Microsoft Store, under Microsoft's privacy statement and terms, not ours.

- The app asks Windows which add-ons your Microsoft account is licensed for, in order to unlock premium features. That exchange is between the app and Windows. We receive nothing.
- The app asks the Store whether an update to this package is pending, so it can prompt you to install it.
- "Rate GMeet" opens the Store's own review page; anything you write there is governed by Microsoft's terms.
- Reference: [Microsoft Privacy Statement](https://privacy.microsoft.com/privacystatement).

## 9. Notifications

Meeting reminders are native Windows notifications, generated entirely on your computer from meetings you scheduled yourself. No notification content passes through any server.

## 10. Our backend service

The supporting service is stateless: no database, no session store, no user records. Its only jobs are:

- To build the Google consent URL and exchange authorisation codes for tokens, so the Google client secret stays off your computer.
- To forward Calendar requests to Google using the token your device supplies.
- To revoke a token when you disconnect.
- To serve the full-size background images.

Requests are handled in memory and discarded. Our hosting provider (Netlify) produces the short-lived operational logs any web service produces; we do not use them to identify or profile users.

## 11. Children

GMeet is a general-purpose productivity tool and is not directed at children. We do not knowingly collect personal information from children. Because the app collects no personal information at all, there is nothing for us to hold, disclose, or delete.

## 12. Your rights, and how to use them

Your data stays on your device, so you are in direct control of it:

- **Access and portability:** Everything the app stores is in your Windows user profile, in plain readable form.
- **Correction and deletion:** Edit or delete meetings, your display name, and history inside the app. Uninstalling removes the rest.
- **Withdrawing Google consent:** Disconnect inside the app, or revoke access at [myaccount.google.com/permissions](https://myaccount.google.com/permissions).
- **Purchases and billing:** Manage subscriptions and purchases directly via [account.microsoft.com/services](https://account.microsoft.com/services).

If you are somewhere that grants you statutory rights over personal data (GDPR, UK GDPR, CCPA, etc.), those rights apply to us too. Since we hold no personal data about you on our systems, in most cases there will be nothing for us to produce or erase — send the request through the Support & Feedback form in Section 1 and we will confirm that in writing and act on anything that does apply.

## 13. Security

App data lives in your Windows user profile, protected by your operating system account. Google's cookies in the meeting window are encrypted at rest by Windows. All network traffic uses HTTPS. Packages installed from the Microsoft Store are signed and integrity-checked by Windows.

No system is perfectly secure. Anyone with access to your unlocked Windows account has access to whatever that account can read, including this app's data.

## 14. Changes to this policy

We may update this policy as the app changes. The effective date at the top always reflects the current version, and material changes — in particular any change to what data leaves your device — will be called out in the release notes on the Microsoft Store listing.

## 15. Contact

- **Support & Feedback:** [Support & Feedback](/support)
- **Terms of Service:** [https://sites.google.com/view/ideaforge-web/g-meet-terms-of-service](https://sites.google.com/view/ideaforge-web/g-meet-terms-of-service)
- **Publisher:** Idea Forge
- **Microsoft Store Listing:** [https://apps.microsoft.com/detail/9PHKS01R0C0B](https://apps.microsoft.com/detail/9PHKS01R0C0B)

> Idea Forge is an independent developer based in Pakistan. GMeet is not affiliated with, endorsed by, or sponsored by Google LLC or Microsoft Corporation.
