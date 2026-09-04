// Imports
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// Data
import { SITE_URL, publisher } from "@/data";

// Creates the tag on first use, then keeps reusing it.
const upsert = (
  selector: string,
  create: () => HTMLElement,
  apply: (el: HTMLElement) => void
) => {
  let el = window.document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    window.document.head.appendChild(el);
  }
  apply(el);
};

const setMeta = (name: string, content: string, attribute: "name" | "property" = "name") =>
  upsert(
    `meta[${attribute}="${name}"]`,
    () => {
      const el = window.document.createElement("meta");
      el.setAttribute(attribute, name);
      return el;
    },
    (el) => el.setAttribute("content", content)
  );

// Keeps the tab title, the meta description, the canonical URL and the social
// tags in step with the route, which a single-page app has to do for itself.
// Without a canonical, every route would otherwise be indexed against the
// same static tags served from index.html.
export const useDocumentMeta = (title: string, description?: string) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title
      ? `${title} — ${publisher.name}`
      : `${publisher.name} — Independent Software Publisher`;

    window.document.title = fullTitle;

    // Trailing slashes are dropped so one page has exactly one canonical form.
    const canonical = `${SITE_URL}${pathname === "/" ? "" : pathname.replace(/\/$/, "")}`;

    upsert(
      'link[rel="canonical"]',
      () => {
        const el = window.document.createElement("link");
        el.setAttribute("rel", "canonical");
        return el;
      },
      (el) => el.setAttribute("href", canonical)
    );

    setMeta("og:title", fullTitle, "property");
    setMeta("og:url", canonical, "property");
    setMeta("twitter:title", fullTitle);

    if (!description) return;

    setMeta("description", description);
    setMeta("og:description", description, "property");
    setMeta("twitter:description", description);
  }, [title, description, pathname]);
};
