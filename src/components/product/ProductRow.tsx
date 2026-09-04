// Imports
import { Link } from "react-router-dom";
// Components
import ProductLogo from "./ProductLogo";
// Types
import type { Product } from "@/types";

// Interface
interface ProductRowProps {
  product: Product;
}

// One entry in the published catalogue. The application's own icon does the
// identifying work, so the card stays quiet around it.
function ProductRow({ product }: ProductRowProps) {
  return (
    <article className="group relative h-full rounded-2xl border border-rule bg-surface p-6 transition-colors hover:border-accent/45 sm:p-7">
      <div className="flex items-start gap-5">
        <ProductLogo product={product} className="size-14 sm:size-16" />

        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold leading-tight tracking-tight text-ink sm:text-xl">
            <Link to={`/products/${product.slug}`} className="transition-colors group-hover:text-accent">
              {/* Stretched so the whole card is the target, keeping one link
                  per product for anything reading the page in sequence. */}
              <span className="absolute inset-0" aria-hidden="true" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-accent">{product.tagline}</p>
        </div>
      </div>

      <p className="mt-5 text-[0.95rem] leading-relaxed text-body">{product.summary}</p>

      <p className="mt-5 text-sm text-muted">{product.released}</p>
    </article>
  );
}

export default ProductRow;
