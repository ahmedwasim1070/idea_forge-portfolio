// Utils
import { parseFrontmatter } from "@/utils";
// Types
import type { LegalDocument } from "@/types";

// Every markdown file in this folder is picked up at build time, so adding a
// document is a matter of dropping the file in beside the others.
const files = import.meta.glob("./legal/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const documents: Record<string, LegalDocument> = Object.fromEntries(
  Object.entries(files).map(([path, raw]) => [
    path.replace("./legal/", "").replace(".md", ""),
    parseFrontmatter(raw),
  ])
);

//
export const getLegalDocument = (file: string): LegalDocument | undefined =>
  documents[file];
