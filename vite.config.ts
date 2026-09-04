// Imports
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import { writeFileSync } from "node:fs";
// Data
import { products } from "./src/data/products";
import { SITE_URL } from "./src/data/site";

// Builds sitemap.xml from the catalogue so a new product cannot be left out.
const sitemap = () => ({
  name: "idea-forge-sitemap",
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
      .map((route) => `  <url><loc>${SITE_URL}${route}</loc></url>`)
      .join("\n");

    writeFileSync(
      "dist/sitemap.xml",
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
    );
    writeFileSync(
      "dist/robots.txt",
      `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
    );
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), sitemap()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
