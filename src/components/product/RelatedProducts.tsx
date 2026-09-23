// Imports
import { Link } from "react-router-dom";
// Components
import ProductLogo from "./ProductLogo";
// Data
import { publisher } from "@/data";
// Utils
import { getPlatformLabel, getRelatedProducts } from "@/utils";

// Interface
interface RelatedProductsProps {
  slug: string;
}

// Someone arriving from a single Store listing should be able to reach the rest
// of the catalogue without going back to the home page.
function RelatedProducts({ slug }: RelatedProductsProps) {
  const related = getRelatedProducts(slug);

  if (related.length === 0) return null;

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
        More from {publisher.name}
      </h2>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((product) => (
          <li key={product.slug}>
            <Link
              to={`/products/${product.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-rule bg-surface p-5 transition-colors hover:border-accent/45"
            >
              <ProductLogo product={product} className="size-12" />

              <span className="mt-4 block font-display font-semibold text-ink transition-colors group-hover:text-accent">
                {product.name}
              </span>
              <span className="mt-1 block text-sm text-muted">{product.tagline}</span>
              <span className="mt-4 block text-xs text-muted">
                {getPlatformLabel(product.platform)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RelatedProducts;
