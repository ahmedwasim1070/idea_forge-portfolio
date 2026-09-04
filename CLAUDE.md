# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The website for **Idea Forge Publisher**, a software publisher operated by Ahmad (`ahmedwasim1070@gmail.com`). It is the canonical home for the publisher's Microsoft Store applications, other software and web projects, and the required legal pages for those apps. It doubles as Ahmad's professional developer presence.

The current live version is a Google Sites page being replaced: https://sites.google.com/view/ideaforge-web/home — treat it as the content source of record for existing products and copy until the new site supersedes it.

**Brand hierarchy matters and is easy to get wrong.** Idea Forge Publisher is the primary identity; Ahmad is the person behind it, surfaced through an about/profile area and links to GitHub, LinkedIn, and other professional profiles. Do not restructure the site so it reads as a personal portfolio with products attached — it reads as an independent software studio whose developer is named.

## Stack

React 19 + Vite 7 + TypeScript, kept deliberately simple. Prefer the smallest dependency set that does the job; this is a content site, not an application. Do not introduce a backend, CMS, database, or auth — product data is static content in the repo.

Runtime dependencies are deliberately few: `react-router-dom` for routing, `react-markdown` + `remark-gfm` to render the legal documents, `lucide-react` for icons. Styling is Tailwind v4 through `@tailwindcss/vite` — there is no `tailwind.config`; the design tokens live in `@theme` in `src/globals.css`. Imports resolve through the `@/` alias to `src/`.

## Commands

```
npm install          # install dependencies
npm run dev          # dev server with HMR
npm run build        # type-check (tsc -b) + production build to dist/
npm run preview      # serve the production build locally
npm run lint         # ESLint
```

There is no test setup. `npm run build` is the check that matters — it type-checks the whole project and fails the build on any error, so run it before considering a change done.

## How it is laid out

```
src/data/         products.ts (the catalogue), site.ts (publisher, nav, support form), profile.ts
src/content/      legal/*.md, picked up by import.meta.glob; index.ts parses frontmatter
src/types/        Product, legal-document and site types
src/utils/        catalogue queries (getProductBySlug, getRelatedProducts, …), frontmatter parser
src/pages/        Home, Products, ProductDetail, Legal, About, Support, NotFound
src/components/   layout/, product/, legal/, profile/, ui/ — each with a barrel index.ts
```

Routes are declared once in `src/App.tsx`. `/products/:slug` and `/products/:slug/:document` are parameterised, so no route registration is needed per product. `Legal` is lazy-loaded to keep the markdown renderer out of the main bundle.

Everything that lists products derives from `src/data/products.ts` — the home page, the products index, the product detail page's related-products surface, the footer's product links, the derived product count in the home copy, and `sitemap.xml`. **Adding a product is one record in that file plus its legal markdown; do not add a page, a route, or a listing entry.** If a change requires editing a listing component to make a product appear, the change is wrong.

`sitemap.xml` and the production `robots.txt` are generated at build time by the `idea-forge-sitemap` plugin in `vite.config.ts`, which imports the catalogue directly. `SITE_URL` there is the single place the site's absolute address is written. Hosted legal documents get sitemap entries; external ones (a product hosting its own policy, e.g. RankedPlaces) deliberately do not.

Legal documents are markdown with frontmatter in `src/content/legal/`, named `<slug>-<document-kind>.md`, and referenced from the catalogue record by `file`. A product's legal entry is either `kind: "hosted"` (a file here) or `kind: "external"` (a URL elsewhere). Deployment is Vercel; `vercel.json` rewrites everything to `index.html` for client-side routing, which is what keeps the Store-referenced legal URLs resolving.

## Architecture intent

The load-bearing decision is the **product content model**. Products (Microsoft Store apps, then other software and websites) are data, not hand-built pages: a typed catalog module exports product records, and routes render from it. Adding a product must mean adding one record plus its assets — never adding a new page component, a new route registration, and three places that list products.

Consequences to hold to:

- **Product pages are generated from the catalog**, one route per product, with a shared page component. Listings on the home page and elsewhere derive from the same catalog.
- **A packaged application's URL is derived from its package name.** The catalogue record carries `packageName` (e.g. `ideaforge.G-MeetDesktopLauncher`) and nothing else; `getPackageSlug` strips the `ideaforge.` publisher segment and converts the rest from Pascal case to kebab case, giving `/products/g-meet-desktop-launcher`. Never hand-write a slug for a Store application — the package name is the single source of truth, so the URL cannot drift from the shipped package. Projects with no package (web apps) declare their own `slug` instead. The product page shows the **complete** package name, publisher segment included.
- **Legal pages are per-product and permanently addressable.** Microsoft Store listings point at a privacy policy URL; once published to the Store, those URLs cannot break. Give each product a stable privacy-policy route and never change or remove one without accounting for the Store listing that references it.
- **Product categories will grow** beyond Store apps (web projects, services, infrastructure). Model the catalog so a new category is a new value, not a new subsystem.
- **Cross-discovery is a product requirement**: a visitor arriving at one Store app's page must have a natural path to the other products and to the developer profile. Product pages carry related-product surfaces; this is not optional decoration.

## Copy constraints

Never describe Idea Forge, its products, or its output as **small**, or with any other diminishing framing ("tiny", "simple little", "just a utility"). The publisher builds real, complete applications and the copy says so. This applies to page copy, meta descriptions, and the catalogue's own summaries.

Headlines must not imply the publisher ships a single product; the catalogue is plural and reads that way.

## Search and social

`SITE_URL` in `src/data/site.ts` is the one place the absolute address is written; `vite.config.ts` and every canonical tag read it. `useDocumentMeta` sets the per-route title, description, canonical and Open Graph tags, because a single-page app serves the same static `index.html` for every route and would otherwise present one set of tags to a crawler. `StructuredData` publishes schema.org JSON-LD — Organization on the home page, SoftwareApplication per product — built from the catalogue in `src/utils/structuredData.ts`.

The Google Search Console verification tag lives in `index.html` as `<meta name="google-site-verification">`. It must stay in the static HTML rather than being injected by React, and it must not be removed after verification passes.

## Product artwork

Application icons live in `public/products/<slug>.png` and are referenced by `logo` on the catalogue record. Icons drawn as a complete tile fill it edge to edge; artwork that is a bare glyph on transparency sets `logoBackground` so it stays visible. Store icons come from the Microsoft Store listing itself, which is the authoritative source — the Google Sites page mixes app icons with the Store badge.

## Design constraints

The visual identity is modern, premium, technically sophisticated, and trustworthy — a serious independent software studio, not a template portfolio. The work is in visual hierarchy, typography, spacing, restrained animation, and product presentation.

Two failure modes to avoid: reaching for a generic component library or starter theme that makes the site look templated, and over-animating. Subtle, purposeful motion only.

Responsive design is a baseline expectation, not a follow-up pass.
