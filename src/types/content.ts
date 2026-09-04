// Interface
// Frontmatter carried at the top of every legal markdown document.
export interface LegalFrontmatter {
  title: string;
  document: string;
  subtitle: string;
  effectiveDate: string;
  lastUpdated: string;
}

// Interface
export interface LegalDocument {
  frontmatter: LegalFrontmatter;
  body: string;
}
