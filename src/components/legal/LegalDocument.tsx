// Imports
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";
// Types
import type { LegalDocument as LegalDocumentType } from "@/types";

// Interface
interface LegalDocumentProps {
  document: LegalDocumentType;
}

// All legal typography lives here, so every policy and every set of terms reads
// the same way no matter which product it belongs to.
function LegalDocument({ document }: LegalDocumentProps) {
  const { frontmatter, body } = document;

  return (
    <article>
      {/*  */}
      <header className="border-b border-rule pb-8">
        <p className="text-sm text-muted">{frontmatter.subtitle}</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          {frontmatter.title}
        </h1>
        <p className="mt-2 text-lg text-muted">{frontmatter.document}</p>

        <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-2 text-sm">
          <div className="flex gap-2">
            <dt className="text-muted">Effective</dt>
            <dd className="text-ink">{frontmatter.effectiveDate}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted">Last updated</dt>
            <dd className="text-ink">{frontmatter.lastUpdated}</dd>
          </div>
        </dl>
      </header>

      {/*  */}
      <div className="max-w-[68ch] break-words pt-10 text-base leading-7 text-body">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h2 className="mt-12 text-2xl font-semibold tracking-tight text-ink">{children}</h2>
            ),
            h2: ({ children }) => (
              <h2 className="mt-12 mb-4 text-xl font-semibold tracking-tight text-ink">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="mt-8 mb-3 text-base font-semibold text-ink">{children}</h3>
            ),
            p: ({ children }) => <p className="mb-4">{children}</p>,
            ul: ({ children }) => (
              <ul className="mb-4 list-disc space-y-2 pl-5 marker:text-rule">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-4 list-decimal space-y-2 pl-5 marker:text-muted">{children}</ol>
            ),
            li: ({ children }) => <li className="pl-1">{children}</li>,
            strong: ({ children }) => (
              <strong className="font-semibold text-ink">{children}</strong>
            ),
            code: ({ children }) => (
              <code className="rounded-sm bg-accent-soft px-1.5 py-0.5 font-mono text-[0.85em] break-all tracking-tight text-ink">
                {children}
              </code>
            ),
            blockquote: ({ children }) => (
              <blockquote className="my-8 border-l-2 border-accent bg-surface px-6 py-5 [&>*:last-child]:mb-0">
                {children}
              </blockquote>
            ),
            a: ({ href, children }) =>
              href && href.startsWith("/") ? (
                <Link
                  to={href}
                  className="break-all text-accent underline underline-offset-4 hover:text-accent-hover"
                >
                  {children}
                </Link>
              ) : (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-accent underline underline-offset-4 hover:text-accent-hover"
                >
                  {children}
                </a>
              ),
          }}
        >
          {body}
        </Markdown>
      </div>
    </article>
  );
}

export default LegalDocument;
