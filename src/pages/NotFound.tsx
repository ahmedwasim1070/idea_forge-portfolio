// Components
import { Button, Container } from "@/components/ui";
// Hooks
import { useDocumentMeta } from "@/hooks";

//
function NotFound() {
  useDocumentMeta("Page not found");

  return (
    <Container>
      <div className="max-w-xl py-24 md:py-32">
        <p className="font-mono text-sm tracking-tight text-muted">404</p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          That page is not here.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-body">
          The link may be out of date. The full catalogue lists every product and its
          legal documents.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/products">See the products</Button>
          <Button href="/" variant="secondary">
            Go home
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default NotFound;
