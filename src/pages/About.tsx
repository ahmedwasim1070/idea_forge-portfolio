// Components
import { Button, Container, Section } from "@/components/ui";
import { ProductGroup } from "@/components/product";
import { ProfileLinks } from "@/components/profile";
// Hooks
import { useDocumentMeta } from "@/hooks";
// Data
import { profile, publisher } from "@/data";
// Utils
import { getProductsByPlatform } from "@/utils";

//
function About() {
  useDocumentMeta(
    "About",
    `${publisher.fullName} is an independent software publisher managed by ${profile.name} right now.`,
  );

  const groups = getProductsByPlatform();

  return (
    <>
      {/*  */}
      <div className="forge-ground on-steel">
        <Container>
          <div className="max-w-2xl py-16 md:py-20">
            <h1 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              About {publisher.name}
            </h1>
            <div className="mt-8 space-y-4">
              {profile.bio.map((paragraph, idx) => (
                <p key={idx} className="text-lg leading-relaxed text-white/70">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* The person behind the publisher. */}
      <Section>
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:gap-16">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              {profile.name}
            </h2>
            <p className="mt-3 text-base text-accent">{profile.role}</p>
            <p className="mt-1 text-base text-muted">{profile.location}</p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-body">
              {publisher.name} is the publisher name the work ships under. The
              profile below is where the engineering itself lives.
            </p>
          </div>

          <ProfileLinks />
        </div>
      </Section>

      {/* The portfolio: everything that has actually shipped. */}
      <Section className="border-t border-rule bg-surface">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            Published work
          </h2>
          <p className="mt-3 text-base leading-relaxed text-body">
            Software across native platforms and the modern web—each designed,
            built, shipped, and supported end-to-end.
          </p>
        </div>

        <div className="mt-12 space-y-14">
          {groups.map((group) => (
            <ProductGroup
              key={group.platform}
              label={group.label}
              blurb={group.blurb}
              products={group.items}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/products">See the products</Button>
          <Button href="/support" variant="secondary">
            Get support
          </Button>
        </div>
      </Section>
    </>
  );
}

export default About;
