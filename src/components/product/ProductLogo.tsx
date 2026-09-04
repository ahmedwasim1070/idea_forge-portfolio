// Types
import type { Product } from "@/types";

// Interface
interface ProductLogoProps {
  product: Product;
  className?: string;
}

// Application artwork, always presented as a tile. Icons drawn as a full tile
// fill it edge to edge; bare glyphs get the backing colour their record names,
// which is what keeps the white RankedPlaces globe visible.
function ProductLogo({ product, className = "size-14" }: ProductLogoProps) {
  return (
    <div
      className={`app-tile shrink-0 overflow-hidden ${className}`}
      style={product.logoBackground ? { backgroundColor: product.logoBackground } : undefined}
    >
      <img
        src={product.logo}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width={512}
        height={512}
        className={`size-full object-contain ${product.logoBackground ? "p-[18%]" : ""}`}
      />
    </div>
  );
}

export default ProductLogo;
