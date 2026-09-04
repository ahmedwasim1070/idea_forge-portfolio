// Imports
import { useEffect } from "react";

// Interface
interface StructuredDataProps {
  id: string;
  data: Record<string, unknown>;
}

// Publishes one schema.org block into the document head. Google reads this to
// build rich results, so the values are derived from the catalogue rather than
// written out a second time by hand.
function StructuredData({ id, data }: StructuredDataProps) {
  const json = JSON.stringify(data);

  useEffect(() => {
    const elementId = `structured-data-${id}`;
    let script = window.document.getElementById(elementId) as HTMLScriptElement | null;

    if (!script) {
      script = window.document.createElement("script");
      script.type = "application/ld+json";
      script.id = elementId;
      window.document.head.appendChild(script);
    }

    script.textContent = json;

    return () => {
      script?.remove();
    };
  }, [id, json]);

  return null;
}

export default StructuredData;
