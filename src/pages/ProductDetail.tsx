// Imports
import { Link, Navigate, useParams } from "react-router-dom";
// Components
import { Container, Section } from "@/components/ui";
import { ProductHero, ProductLegalLinks, RelatedProducts } from "@/components/product";
import { StructuredData } from "@/components/seo";
// Hooks
import { useDocumentMeta } from "@/hooks";
// Utils
import { getProductBySlug, getProductSchema } from "@/utils";

//
function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  useDocumentMeta(product ? product.name : "Not found", product?.summary);

  const schema = product ? getProductSchema(product) : null;

  // An unknown slug is not a product page, so send it to the catalogue.
  if (!product) return <Navigate to="/products" replace />;

  return (
    <>
      {schema && <StructuredData id="product" data={schema} />}

      {/*  */}
      <Container>
        <div className="py-8">
          <Link
            to="/products"
            className="text-sm text-muted underline underline-offset-4 transition-colors hover:text-accent"
          >
            All products
          </Link>
        </div>
      </Container>

      {/*  */}
      <Container>
        <div className="pb-16">
          <ProductHero product={product} />
        </div>
      </Container>

      {/* Microsoft Store listings point directly at these documents. */}
      <Section className="border-t border-rule bg-surface">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
          Legal
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-body">
          The privacy policy and terms that apply to {product.name}.
        </p>
        <div className="mt-6">
          <ProductLegalLinks product={product} />
        </div>
      </Section>

      {/*  */}
      <Section className="border-t border-rule">
        <RelatedProducts slug={product.slug} />
      </Section>
    </>
  );
}

export default ProductDetail;
