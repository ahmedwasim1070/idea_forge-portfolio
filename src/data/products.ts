// Types
import type { Product, ProductRecord } from "@/types";
// Utils
// A relative path on purpose: vite.config.ts imports this catalogue to build
// the sitemap, and Node resolves that outside the "@" alias.
import { getPackageSlug } from "../utils/packageName";

// The catalogue. Adding a product here is the only code change a new release
// needs: listings, routes, legal pages and the sitemap all derive from it.
//
// A Microsoft Store application declares its package name and nothing else —
// its URL is derived from it, so the two can never drift apart.
const catalogue: ProductRecord[] = [
  {
    packageName: "ideaforge.G-MeetDesktopLauncher",
    name: "GMeet - Video Calls and Meetings",
    tagline: "App Client for Google Meet",
    summary:
      "A desktop utility that makes Google Meet easier to reach from Windows, without opening a browser first.",
    description: [
      "GMeet is an independent desktop utility for Windows that makes Google Meet easier to reach. It creates and joins meetings, detects meeting links you copy, schedules meetings with reminders, offers downloadable virtual backgrounds, and can open Google Meet in a dedicated application window.",
      "The app is not Google Meet, and it is not a video-calling service. It does not host, transmit, or process any part of a call. Every meeting runs on Google's own service, between you and Google.",
    ],
    features: [
      "Create and join meetings from the desktop",
      "Detects meeting links you copy",
      "Meeting scheduling with reminders",
      "Downloadable virtual backgrounds",
      "Google Meet in a dedicated window",
    ],
    logo: "/products/G-MeetDesktopLauncher.png",
    platform: "microsoft-store",
    released: "August 2026",
    liveUrl: "https://apps.microsoft.com/detail/9PHKS01R0C0B",
    storeId: "9PHKS01R0C0B",
    isFeatured: true,
    legal: {
      "privacy-policy": {
        kind: "hosted",
        label: "Privacy Policy",
        file: "g-meet-privacy-policy",
      },
      "terms-of-service": {
        kind: "hosted",
        label: "Terms of Service",
        file: "g-meet-terms-of-service",
      },
    },
  },
  {
    packageName: "ideaforge.Yt-AppForYoutube",
    name: "YT Videos - AdBlocker, Downloader and Music",
    tagline: "One Client for all YouTube Platform",
    summary:
      "A dedicated Windows window for YouTube, YouTube Music and YouTube Kids, with its own playback controls.",
    description: [
      "AdBlocker for YT Videos is a Windows desktop client for YouTube. It provides access to YouTube, YouTube Music, and YouTube Kids in a dedicated application window with its own features and controls, including ad blocking, a pop-out player, background play, and video downloading.",
      "The app is a viewer. It does not host, mirror, or re-serve video content. Content is delivered from YouTube's own services directly to your computer, in the same general manner as when accessing YouTube through a web browser.",
    ],
    features: [
      "YouTube, YouTube Music and YouTube Kids in one window",
      "Ad blocking",
      "Pop-out player",
      "Background play",
      "Video downloading",
      "Desktop-wide shortcut keys",
    ],
    logo: "/products/Yt-AppForYoutube.png",
    platform: "microsoft-store",
    released: "September 2026",
    liveUrl: "https://apps.microsoft.com/detail/9PG1Z4WJM4WG",
    storeId: "9PG1Z4WJM4WG",
    isFeatured: true,
    legal: {
      "privacy-policy": {
        kind: "hosted",
        label: "Privacy Policy",
        file: "adblocker-for-yt-videos-privacy-policy",
      },
      "terms-of-service": {
        kind: "hosted",
        label: "Terms of Service",
        file: "adblocker-for-yt-videos-terms-of-service",
      },
    },
  },
  {
    packageName: "ideaforge.SpotLaunch",
    name: "SpotLaunch",
    tagline: "Social media browser and launcher",
    summary:
      "A launcher for Windows 10 and 11 that opens the applications and sites you already use, from anywhere.",
    description: [
      "SpotLaunch is a launcher for Windows 10 and 11. It lists the applications already installed on your PC, lets you bookmark websites and pin favourites, and opens them for you — from its own window, from a panel in the notification area, or from a keyboard shortcut.",
      "It is a way of reaching things you already have. It does not install software, it does not modify the applications it lists, and it does not act on your behalf beyond opening what you ask it to open.",
    ],
    features: [
      "Lists the applications already installed on your PC",
      "Bookmark websites and pin favourites",
      "Opens from a notification-area panel",
      "Keyboard shortcut access",
    ],
    logo: "/products/SpotLaunch.png",
    platform: "microsoft-store",
    released: "August 2026",
    liveUrl: "https://apps.microsoft.com/detail/9NGC63JNJ6TG",
    storeId: "9NGC63JNJ6TG",
    isFeatured: true,
    legal: {
      "privacy-policy": {
        kind: "hosted",
        label: "Privacy Policy",
        file: "spotlaunch-privacy-policy",
      },
      "terms-of-service": {
        kind: "hosted",
        label: "Terms of Service",
        file: "spotlaunch-terms-of-service",
      },
    },
  },
  {
    slug: "rankedplaces",
    name: "RankedPlaces",
    tagline: "Community place ranking platform",
    summary:
      "An open-source web platform for finding and ranking overlooked places, built on community votes.",
    description: [
      "RankedPlaces is a web platform for discovering hidden gems and underrated locations — a quiet cafe, a scenic trail, a local shop that deserves more attention. People post, review, and vote on the places that matter to them.",
      "The project is open source, and its own privacy policy and terms are published on the platform itself.",
    ],
    features: [
      "Community posting and voting",
      "Ranking by tag, city and country",
      "Location-aware discovery",
      "Open source",
    ],
    logo: "/products/rankedplaces.png",
    platform: "web",
    released: "2026",
    liveUrl: "https://rankedplaces.vercel.app",
    sourceUrl: "https://github.com/ahmedwasim1070/rankedplaces-webapp",
    legal: {
      "privacy-policy": {
        kind: "external",
        label: "Privacy Policy",
        url: "https://rankedplaces.vercel.app/privacy-policy",
      },
      "terms-of-service": {
        kind: "external",
        label: "Terms of Usage",
        url: "https://rankedplaces.vercel.app/terms-of-usage",
      },
    },
  },
];

// A packaged application is addressed by its package name in kebab case; a
// project without a package keeps the segment it declares.
export const products: Product[] = catalogue.map((product) => ({
  ...product,
  slug: product.packageName
    ? getPackageSlug(product.packageName)
    : product.slug!,
}));
