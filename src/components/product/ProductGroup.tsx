// Components
import ProductIndex from "./ProductIndex";
// Types
import type { Product } from "@/types";

// Interface
interface ProductGroupProps {
  label: string;
  blurb: string;
  products: Product[];
}

// One distribution channel and everything published through it. The catalogue
// is never presented as a single undivided list.
function ProductGroup({ label, blurb, products }: ProductGroupProps) {
  return (
    <section>
      <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-rule pb-4">
        <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
          {label}
        </h3>
        <p className="text-sm text-muted">{blurb}</p>
      </div>

      <ProductIndex products={products} />
    </section>
  );
}

export default ProductGroup;
