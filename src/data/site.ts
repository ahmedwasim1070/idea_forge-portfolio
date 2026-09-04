// Types
import type { NavigationItem } from "@/types";

// The site's canonical address. vite.config.ts reads this to build the sitemap,
// and every canonical and social tag is derived from it, so this is the one
// place the absolute URL is written.
export const SITE_URL = "https://ideaforge-web.netlify.app";

// Publisher identity. Idea Forge is the brand; Ahmad is named through it.
export const publisher = {
  name: "Idea Forge",
  fullName: "Idea Forge Publisher",
  tagline: "Forging Idea's Into App's",
  description:
    "Idea Forge builds precise, well-engineered software for Windows and the web.",
};

// The Support & Feedback form. Every published application points at this one
// channel, so the address has to keep working.
export const supportForm = {
  embedUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSe3qL8A9KNwERXm2Ov5j8rSEB7vvBsxhXHxk-DA1PLPDQ_fNw/viewform?embedded=true",
  directUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSe3qL8A9KNwERXm2Ov5j8rSEB7vvBsxhXHxk-DA1PLPDQ_fNw/viewform",
};

export const primaryNavigation: NavigationItem[] = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
];
