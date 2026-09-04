// Imports
import { Link } from "react-router-dom";
// Components
import Logo from "./Logo";
// Data
import { publisher } from "@/data";

// Interface
interface WordmarkProps {
  className?: string;
  onSteel?: boolean;
}

//
function Wordmark({ className = "", onSteel = false }: WordmarkProps) {
  return (
    <Link
      to="/"
      aria-label={`${publisher.fullName} home`}
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <Logo className="size-7 shrink-0" />

      <span
        className={`font-display text-[1.05rem] font-bold tracking-tight ${
          onSteel ? "text-white" : "text-ink"
        }`}
      >
        {publisher.name}
      </span>
    </Link>
  );
}

export default Wordmark;
