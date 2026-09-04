// Imports
import { Link, Navigate, useParams } from "react-router-dom";
// Components
import { Container, Section } from "@/components/ui";
import { LegalDocument } from "@/components/legal";
import { RelatedProducts } from "@/components/product";
// Hooks
import { useDocumentMeta } from "@/hooks";
// Content
import { getLegalDocument } from "@/content";
// Utils
import { getProductBySlug } from "@/utils";
// Types
import type { LegalDocumentKind } from "@/types";

//
function Legal() {
  const { slug, document: kind } = useParams();
  const product = getProductBySlug(slug);
  const reference = product?.legal[kind as LegalDocumentKind];

  // Only documents held in this repository render here; the external ones are
  // linked straight out to the product's own site.
  const legalDocument =
    reference && reference.kind === "hosted" ? getLegalDocument(reference.file) : undefined;

  useDocumentMeta(
    legalDocument ? `${product?.name} ${legalDocument.frontmatter.document}` : "Not found",
    legalDocument
      ? `The ${legalDocument.frontmatter.document.toLowerCase()} for ${product?.name}, published by Idea Forge.`
      : undefined
  );

  if (!product) return <Navigate to="/products" replace />;
  if (!legalDocument) return <Navigate to={`/products/${product.slug}`} replace />;

  return (
    <>
      {/*  */}
      <Container>
        <div className="py-8">
          <Link
            to={`/products/${product.slug}`}
            className="text-sm text-muted underline underline-offset-4 transition-colors hover:text-ink"
          >
            {product.name}
          </Link>
        </div>
      </Container>

      {/*  */}
      <Container>
        <div className="pb-20">
          <LegalDocument document={legalDocument} />
        </div>
      </Container>

      {/*  */}
      <Section bordered>
        <RelatedProducts slug={product.slug} />
      </Section>
    </>
  );
}

export default Legal;
