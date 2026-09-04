// Types
import type { LegalDocument } from "@/types";

// Reads the leading --- block of a markdown file. The fields are simple
// key/value strings, so a full YAML parser would be more than this needs.
export const parseFrontmatter = (raw: string): LegalDocument => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!match) {
    return {
      frontmatter: {
        title: "",
        document: "",
        subtitle: "",
        effectiveDate: "",
        lastUpdated: "",
      },
      body: raw.trim(),
    };
  }

  // Field values may contain colons, so only split on the first one.
  const fields: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    fields[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }

  return {
    frontmatter: {
      title: fields.title ?? "",
      document: fields.document ?? "",
      subtitle: fields.subtitle ?? "",
      effectiveDate: fields.effectiveDate ?? "",
      lastUpdated: fields.lastUpdated ?? "",
    },
    body: raw.slice(match[0].length).trim(),
  };
};
