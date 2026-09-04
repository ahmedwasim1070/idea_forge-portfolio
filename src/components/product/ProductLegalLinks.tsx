// Imports
import { Link } from "react-router-dom";
// Utils
import { getLegalDocumentKinds } from "@/utils";
// Types
import type { Product } from "@/types";

// Interface
interface ProductLegalLinksProps {
  product: Product;
}

// Legal documents are reachable from every listing, because Microsoft Store
// listings send people here looking for exactly these pages.
function ProductLegalLinks({ product }: ProductLegalLinksProps) {
  const kinds = getLegalDocumentKinds(product);
  const linkClasses = "text-sm text-muted underline underline-offset-4 transition-colors hover:text-accent";

  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <li>
        <Link to={`/products/${product.slug}`} className={linkClasses}>
          Product details
        </Link>
      </li>

      {kinds.map((kind) => {
        const document = product.legal[kind];
        if (!document) return null;

        return (
          <li key={kind}>
            {document.kind === "external" ? (
              <a
                href={document.url}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClasses}
              >
                {document.label}
              </a>
            ) : (
              <Link to={`/products/${product.slug}/${kind}`} className={linkClasses}>
                {document.label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default ProductLegalLinks;
