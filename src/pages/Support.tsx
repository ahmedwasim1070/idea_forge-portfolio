// Components
import { Container, Section } from "@/components/ui";
import { SupportForm } from "@/components/support";
// Hooks
import { useDocumentMeta } from "@/hooks";
// Data
import { publisher } from "@/data";

//
function Support() {
  useDocumentMeta(
    "Support",
    `Support and feedback for every application published by ${publisher.name}, through one form.`,
  );

  return (
    <>
      {/*  */}
      <div className="forge-ground on-steel">
        <Container>
          <div className="max-w-2xl py-16 md:py-20">
            <h1 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Support &amp; Feedback
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              Have a bug to report, feedback to share, or a question about
              privacy? Reach out directly using the form below.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/55">
              A confirmation is sent to the email address you enter, and that is
              where we will reply.
            </p>
          </div>
        </Container>
      </div>

      {/* The one channel every published application points at. It is sent
          through our own mail, so no support address is published here. */}
      <Section>
        <div className="max-w-3xl">
          <SupportForm />
        </div>
      </Section>
    </>
  );
}

export default Support;
