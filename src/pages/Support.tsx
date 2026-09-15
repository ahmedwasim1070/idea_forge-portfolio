// Components
import { Container, Section } from "@/components/ui";
// Hooks
import { useDocumentMeta } from "@/hooks";
// Data
import { supportForm } from "@/data";

//
function Support() {
  useDocumentMeta(
    "Support",
    "Support and feedback for every application published by Idea Forge, through one form.",
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
              If the form does not load,{" "}
              <a
                href={supportForm.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-flare underline underline-offset-4 hover:text-white"
              >
                open it in a new tab
              </a>
              .
            </p>
          </div>
        </Container>
      </div>

      {/* The form is the Google Form the published applications already point at. */}
      <Section>
        <div className="overflow-hidden rounded-2xl border border-rule bg-surface">
          <iframe
            src={supportForm.embedUrl}
            title="Idea Forge Support and Feedback form"
            className="h-[70vh] min-h-[600px] w-full"
            loading="lazy"
          >
            Loading the support form
          </iframe>
        </div>
      </Section>
    </>
  );
}

export default Support;
