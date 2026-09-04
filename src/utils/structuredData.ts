// Data
import { SITE_URL, profile, profileLinks, publisher } from "@/data";
// Utils
import { getPlatformLabel } from "./products";
// Types
import type { Product } from "@/types";

// The publisher itself, so a search for the studio name resolves to the site
// rather than to one of its applications.
export const getOrganizationSchema = (): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: publisher.fullName,
  alternateName: publisher.name,
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  description: publisher.description,
  founder: {
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
  },
  sameAs: profileLinks.map((link) => link.href),
});

// One published application. Price is stated because Google omits software
// results that carry no offer at all.
export const getProductSchema = (product: Product): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: product.name,
  description: product.summary,
  url: `${SITE_URL}/products/${product.slug}`,
  image: `${SITE_URL}${product.logo}`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem:
    product.platform === "microsoft-store" ? "Windows 10, Windows 11" : "Web browser",
  downloadUrl: product.liveUrl,
  featureList: product.features,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: product.liveUrl,
  },
  publisher: {
    "@type": "Organization",
    name: publisher.fullName,
    url: SITE_URL,
  },
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Distribution",
      value: getPlatformLabel(product.platform),
    },
    ...(product.packageName
      ? [
          {
            "@type": "PropertyValue",
            name: "Package",
            value: product.packageName,
          },
        ]
      : []),
  ],
});
