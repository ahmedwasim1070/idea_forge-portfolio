// Imports
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "quiet" | "on-steel";

// Predefined variant mapping so Tailwind keeps these classes in the build.
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white border border-accent hover:bg-accent-hover hover:border-accent-hover",
  secondary: "bg-surface text-ink border border-rule hover:border-accent",
  quiet: "bg-transparent text-accent border border-transparent hover:text-accent-hover",
  // For use on the dark forge panels, where the light variants disappear.
  "on-steel": "bg-white/10 text-white border border-white/20 hover:bg-white/20",
};

// Interface
interface ButtonProps {
  children: ReactNode;
  // Without an address the button is a real <button>, e.g. to submit a form.
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: ButtonVariant;
  className?: string;
}

//
function Button({
  children,
  href,
  type = "button",
  disabled = false,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`;

  if (!href) {
    return (
      <button type={type} disabled={disabled} className={classes}>
        {children}
      </button>
    );
  }

  // Anything that is not a site route opens in a new tab.
  const isExternal = !href.startsWith("/");

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {/* Marks the jump off-site; the icon is the affordance, not decoration. */}
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link to={href} className={classes}>
      {children}
    </Link>
  );
}

export default Button;
