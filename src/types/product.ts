// Where a product is distributed.
export type ProductPlatform = "microsoft-store" | "web";

// Which legal document a route refers to.
export type LegalDocumentKind = "privacy-policy" | "terms-of-service" | "terms-of-usage";

// Interface
// A legal document written and hosted in this repository.
export interface HostedLegalDocument {
  kind: "hosted";
  label: string;
  file: string;
}

// Interface
// A legal document that lives on the product's own site.
export interface ExternalLegalDocument {
  kind: "external";
  label: string;
  url: string;
}

export type ProductLegalDocument = HostedLegalDocument | ExternalLegalDocument;

// Interface
// What gets written in the catalogue. A packaged application is identified by
// its package name and its route is derived from it; a project that ships
// without a package names its own route segment instead.
export interface ProductRecord {
  packageName?: string;
  slug?: string;
  name: string;
  tagline: string;
  summary: string;
  description: string[];
  features: string[];
  platform: ProductPlatform;
  // Square application artwork in public/products. Icons that are drawn as a
  // full tile need no backing; artwork that is a bare glyph names the tile
  // colour it has to sit on.
  logo: string;
  logoBackground?: string;
  released: string;
  liveUrl: string;
  storeId?: string;
  sourceUrl?: string;
  isFeatured?: boolean;
  legal: Partial<Record<LegalDocumentKind, ProductLegalDocument>>;
}

// Interface
// A catalogue record after its route segment has been resolved. Everything that
// renders a product works with this, so `slug` is always present.
export interface Product extends ProductRecord {
  slug: string;
}
