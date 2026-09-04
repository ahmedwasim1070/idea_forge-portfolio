// Imports
import type { ReactNode } from "react";
// Components
import Container from "./Container";

// Interface
interface SectionProps {
  children: ReactNode;
  id?: string;
  bordered?: boolean;
  className?: string;
}

//
function Section({ children, id, bordered = false, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${bordered ? "border-t border-rule" : ""} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export default Section;
