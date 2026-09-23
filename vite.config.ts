// Imports
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import { appendFileSync, writeFileSync } from "node:fs";
// Data
import { products } from "./src/data/products";
import { SITE_URL } from "./src/data/site";

// Netlify hands every build the site's primary address as URL: the custom
// domain when one is attached as primary in the dashboard, the .netlify.app
// address otherwise. Nothing here names the custom domain, so detaching it and
// redeploying puts the site back on the .netlify.app address untouched.
const siteUrl = (process.env.URL ?? SITE_URL).replace(/\/$/, "");

// Builds sitemap.xml and robots.txt from the catalogue so a new product cannot
// be left out, and sends the .netlify.app address on to the primary domain.
const siteFiles = () => ({
  name: "ideaforge-site-files",
  // index.html is written against the permanent address. Its canonical and
  // social tags are pointed at the primary one here, because crawlers read them
  // before any script runs.
  transformIndexHtml(html: string) {
    return html.replaceAll(SITE_URL, siteUrl);
  },
  closeBundle() {
    const routes = ["/", "/products", "/about", "/support"];

    for (const product of products) {
      routes.push(`/products/${product.slug}`);

      for (const [kind, document] of Object.entries(product.legal)) {
        // External documents live on the product's own site, so they are not
        // routes here and do not belong in this sitemap.
        if (document?.kind === "hosted") routes.push(`/products/${product.slug}/${kind}`);
      }
    }

    const urls = routes
      .map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`)
      .join("\n");

    writeFileSync(
      "dist/sitemap.xml",
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
    );
    writeFileSync(
      "dist/robots.txt",
      `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
    );

    // public/_redirects carries the rules that never change. The redirect to the
    // primary domain is appended to its copy in dist, because only the build
    // knows which domain the dashboard has set. It only matches requests made
    // to the .netlify.app host, so deploy previews and the primary domain itself
    // are untouched. Netlify reads _redirects before netlify.toml, so this runs
    // ahead of the single-page fallback.
    if (siteUrl !== SITE_URL) {
      appendFileSync("dist/_redirects", `\n${SITE_URL}/* ${siteUrl}/:splat 301!\n`);
    }
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), siteFiles()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
