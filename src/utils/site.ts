// Data
import { SITE_URL } from "@/data";

// The address the page is actually being served from: the custom domain when
// one is attached in Netlify, the .netlify.app address when it is not. Canonical
// and schema.org URLs follow it, so they always name the address that answered
// rather than one that redirects. Outside a browser the permanent address stands in.
export const getSiteUrl = (): string =>
  typeof window === "undefined" ? SITE_URL : window.location.origin;
