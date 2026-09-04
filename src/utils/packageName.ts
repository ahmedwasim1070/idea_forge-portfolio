// The publisher segment every application package carries. It identifies the
// publisher, so it is never repeated in a URL.
export const PACKAGE_PUBLISHER = "ideaforge";

// Everything after the publisher segment, e.g. "G-MeetDesktopLauncher".
export const getPackageIdentifier = (packageName: string): string =>
  packageName.startsWith(`${PACKAGE_PUBLISHER}.`)
    ? packageName.slice(PACKAGE_PUBLISHER.length + 1)
    : packageName;

// Package identifiers are written in Pascal case; URLs are kebab case. A hyphen
// already in the identifier is a word break the author put there, so it is kept
// as a single separator rather than doubled:
//   ideaforge.G-MeetDesktopLauncher -> g-meet-desktop-launcher
//   ideaforge.Yt-AppForYoutube      -> yt-app-for-youtube
//   ideaforge.SpotLaunch            -> spot-launch
export const toKebabCase = (identifier: string): string =>
  identifier
    // An acronym running into a normal word: "YTVideo" -> "YT-Video".
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    // A normal case change: "SpotLaunch" -> "Spot-Launch".
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    // Collapse any run of separators the identifier already contained.
    .replace(/[-_.\s]+/g, "-")
    .replace(/^-|-$/g, "");

// The route segment a packaged application is published under.
export const getPackageSlug = (packageName: string): string =>
  toKebabCase(getPackageIdentifier(packageName));
