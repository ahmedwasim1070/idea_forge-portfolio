// Data
import { profile, profileLinks, publisher } from "@/data";
// Utils
import { getPlatformLabel } from "./products";
import { getSiteUrl } from "./site";
// Types
import type { Product } from "@/types";

// The publisher itself, so a search for the studio name resolves to the site
// rather than to one of its applications.
export const getOrganizationSchema = (): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: publisher.fullName,
  alternateName: publisher.name,
  url: getSiteUrl(),
  logo: `${getSiteUrl()}/og-image.png`,
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
  url: `${getSiteUrl()}/products/${product.slug}`,
  image: `${getSiteUrl()}${product.logo}`,
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
    url: getSiteUrl(),
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
