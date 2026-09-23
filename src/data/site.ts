// Types
import type { NavigationItem } from "@/types";

// The site's permanent address. vite.config.ts reads this to build the sitemap,
// so this is the one place the absolute URL is written. A custom domain is never
// named in the code: when one is attached as the primary domain in the Netlify
// dashboard, the build picks it up from Netlify and redirects this address to
// it. If the domain ever lapses, this address keeps serving the site as it is.
export const SITE_URL = "https://ideaforge-software.netlify.app";

// Publisher identity.
export const publisher = {
  name: "IdeaForge Software",
  fullName: "IdeaForge Software",
  tagline: "Forging Idea's Into App's",
  description:
    "IdeaForge Software crafts precise, resilient digital solutions across platforms, architectures, and borders.",
};

// The Support & Feedback form. It posts to a Netlify function, which keeps the
// Brevo key on the server and sends mail from this address.
export const supportForm = {
  endpoint: "/.netlify/functions/support",
  email: "support@ideaforge-software.com",
  // The form and the function check every request against these.
  limits: {
    name: 100,
    email: 254,
    subject: 150,
    // A description needs enough in it to act on; this is the shortest taken.
    messageMin: 10,
    message: 5000,
  },
};

// What a support request can be about. The form lists these and the function
// accepts nothing else, so both read them from here.
export const supportTopics: string[] = [
  "Bug report",
  "Feedback",
  "Feature request",
  "Billing & subscriptions",
  "Privacy",
  "Other",
];

export const primaryNavigation: NavigationItem[] = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
];
