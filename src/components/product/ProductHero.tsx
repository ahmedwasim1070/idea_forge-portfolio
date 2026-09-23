// Components
import ProductLogo from "./ProductLogo";
import { Button, SpecList } from "@/components/ui";
// Data
import { publisher } from "@/data";
// Utils
import { getPlatformLabel } from "@/utils";
// Types
import type { Product } from "@/types";
import type { SpecItem } from "@/components/ui/SpecList";

// Interface
interface ProductHeroProps {
  product: Product;
}

//
function ProductHero({ product }: ProductHeroProps) {
  // Only the identifiers a product actually has are listed.
  const specs: SpecItem[] = [
    { term: "Platform", value: getPlatformLabel(product.platform) },
    { term: "Published", value: product.released },
    { term: "Publisher", value: publisher.name },
  ];

  if (product.storeId) {
    specs.splice(1, 0, { term: "Store ID", value: product.storeId, mono: true });
  }

  // The complete package identity, which is what the Store and the machine use.
  if (product.packageName) {
    specs.splice(1, 0, { term: "Package", value: product.packageName, mono: true });
  }

  const isStoreApp = product.platform === "microsoft-store";

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_18rem]">
      {/*  */}
      <div>
        <div className="flex flex-wrap items-center gap-5">
          <ProductLogo product={product} className="size-20 sm:size-24" />

          <div className="min-w-0">
            <h1 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-1.5 text-lg text-accent">{product.tagline}</p>
          </div>
        </div>

        <div className="mt-8 max-w-2xl space-y-4">
          {product.description.map((paragraph, idx) => (
            <p key={idx} className="text-base leading-relaxed text-body">
              {paragraph}
            </p>
          ))}
        </div>

        {/*  */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={product.liveUrl}>
            {isStoreApp ? "Get on Microsoft Store" : "Open the site"}
          </Button>
          {product.sourceUrl && (
            <Button href={product.sourceUrl} variant="secondary">
              View source
            </Button>
          )}
        </div>
      </div>

      {/*  */}
      <div className="rounded-2xl border border-rule bg-surface p-6">
        <SpecList items={specs} />

        <h2 className="mt-8 font-display text-sm font-semibold text-ink">What it does</h2>
        <ul className="mt-4 space-y-2.5">
          {product.features.map((feature) => (
            <li
              key={feature}
              className="flex gap-2.5 text-sm leading-relaxed text-body"
            >
              <span
                className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductHero;
