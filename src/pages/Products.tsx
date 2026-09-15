// Components
import { Container, Section } from "@/components/ui";
import { ProductGroup } from "@/components/product";
// Hooks
import { useDocumentMeta } from "@/hooks";
// Utils
import { getProductsByPlatform } from "@/utils";

//
function Products() {
  useDocumentMeta(
    "Products",
    "Every application and project published by Idea Forge, with privacy policies and terms.",
  );

  // Groups come from the catalogue, so a new channel needs no change here.
  const groups = getProductsByPlatform();

  return (
    <>
      {/*  */}
      <div className="forge-ground on-steel">
        <Container>
          <div className="max-w-2xl py-16 md:py-20">
            <h1 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Products
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              Software across native platforms and the modern web—each designed,
              built, shipped, and supported end-to-end.
            </p>
          </div>
        </Container>
      </div>

      {/*  */}
      <Section>
        <div className="space-y-14">
          {groups.map((group) => (
            <ProductGroup
              key={group.platform}
              label={group.label}
              blurb={group.blurb}
              products={group.items}
            />
          ))}
        </div>
      </Section>
    </>
  );
}

export default Products;
