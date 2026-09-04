// Data
import { products } from "@/data";
// Types
import type { LegalDocumentKind, Product, ProductPlatform } from "@/types";

// How each platform is named in the interface, and what it means to a visitor.
// A new distribution channel is a new entry here plus a new value in the type —
// no listing component changes.
const platformLabels: Record<ProductPlatform, string> = {
  "microsoft-store": "Microsoft Store",
  web: "Web Apps",
};

const platformBlurbs: Record<ProductPlatform, string> = {
  "microsoft-store":
    "Windows desktop applications, published and updated through the Microsoft Store.",
  web: "Projects that run in the browser, with nothing to install.",
};

//
export const getPlatformLabel = (platform: ProductPlatform): string =>
  platformLabels[platform];

//
export const getProductBySlug = (slug?: string): Product | undefined =>
  products.find((product) => product.slug === slug);

//
export const getFeaturedProducts = (): Product[] =>
  products.filter((product) => product.isFeatured);

// Products grouped in the order the platforms are declared above, so a new
// platform appears without touching any listing component.
export const getProductsByPlatform = (): {
  platform: ProductPlatform;
  label: string;
  blurb: string;
  items: Product[];
}[] =>
  (Object.keys(platformLabels) as ProductPlatform[])
    .map((platform) => ({
      platform,
      label: platformLabels[platform],
      blurb: platformBlurbs[platform],
      items: products.filter((product) => product.platform === platform),
    }))
    .filter((group) => group.items.length > 0);

// Everything except the product being viewed, so a visitor arriving from one
// Store listing can reach the rest of the catalogue.
export const getRelatedProducts = (slug: string): Product[] =>
  products.filter((product) => product.slug !== slug);

//
export const getLegalDocumentKinds = (product: Product): LegalDocumentKind[] =>
  (Object.keys(product.legal) as LegalDocumentKind[]).filter(
    (kind) => product.legal[kind] !== undefined
  );
