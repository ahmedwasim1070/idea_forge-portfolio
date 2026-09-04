// Imports
import { Link } from "react-router-dom";
// Components
import { Button, Container, Section } from "@/components/ui";
import { ProductGroup } from "@/components/product";
import { StructuredData } from "@/components/seo";
import { ProfileLinks } from "@/components/profile";
// Hooks
import { useDocumentMeta } from "@/hooks";
// Data
import { profile, publisher } from "@/data";
// Utils
import { getOrganizationSchema, getProductsByPlatform } from "@/utils";

//
function Home() {
  useDocumentMeta("", publisher.description);

  const groups = getProductsByPlatform();
  const schema = getOrganizationSchema();

  return (
    <>
      <StructuredData id="organization" data={schema} />

      {/* The forge. */}
      <div className="forge-ground on-steel">
        <Container>
          <div className="max-w-3xl py-24 md:py-32">
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Forging ideas into applications.
            </h1>

            <div className="ember-gradient mt-8 h-1 w-24 rounded-full" />

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">
              Idea Forge is an independent software publisher. We build desktop
              applications for Windows and projects for the web — designed, built, and
              maintained in-house.
            </p>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/55">
              The desktop applications keep no accounts and collect no analytics. What
              they remember stays on your own computer.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/products">Browse the catalogue</Button>
              <Button href="/about" variant="on-steel">
                About the studio
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* The catalogue, divided by where each product ships. */}
      <Section>
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            Published work
          </h2>
          <p className="mt-3 text-base leading-relaxed text-body">
            Everything published under the Idea Forge name, with the privacy policy and
            terms for each.
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
      </Section>

      {/* The developer behind the publisher. */}
      <Section className="border-t border-rule bg-surface">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:gap-16">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Managed by {profile.name}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-body">
              {profile.role}, based in {profile.location}. Every product published here
              is solo-engineered and maintained.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-block text-sm font-medium text-accent underline underline-offset-4 hover:text-accent-hover"
            >
              About the publisher
            </Link>
          </div>

          <ProfileLinks />
        </div>
      </Section>
    </>
  );
}

export default Home;
