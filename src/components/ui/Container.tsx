// Imports
import type { ReactNode } from "react";

// Interface
interface ContainerProps {
  children: ReactNode;
  className?: string;
}

//
function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

export default Container;
