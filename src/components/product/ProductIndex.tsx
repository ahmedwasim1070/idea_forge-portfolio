// Components
import ProductRow from "./ProductRow";
// Types
import type { Product } from "@/types";

// Interface
interface ProductIndexProps {
  products: Product[];
}

//
function ProductIndex({ products }: ProductIndexProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {products.map((product) => (
        <ProductRow key={product.slug} product={product} />
      ))}
    </div>
  );
}

export default ProductIndex;
