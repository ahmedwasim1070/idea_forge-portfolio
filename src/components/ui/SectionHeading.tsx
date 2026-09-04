// Imports
import type { ReactNode } from "react";

// Interface
interface SectionHeadingProps {
  title: string;
  lead?: string;
  action?: ReactNode;
}

//
function SectionHeading({ title, lead, action }: SectionHeadingProps) {
  return (
    <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      {/*  */}
      <div className="max-w-2xl">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          {title}
        </h2>
        {lead && <p className="mt-3 text-base leading-relaxed text-body">{lead}</p>}
      </div>

      {/*  */}
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export default SectionHeading;
