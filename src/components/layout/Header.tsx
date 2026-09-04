// Imports
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
// Components
import Wordmark from "./Wordmark";
import { Container } from "@/components/ui";
// Data
import { primaryNavigation } from "@/data";

//
function Header() {
  // Mobile menu
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Shared between the desktop row and the mobile panel.
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-accent" : "text-body hover:text-accent"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-canvas/85 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/*  */}
          <Wordmark />

          {/*  */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {primaryNavigation.map((item) => (
                <li key={item.href}>
                  <NavLink to={item.href} className={linkClasses}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/*  */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="rounded-lg p-1 text-ink transition-colors hover:text-accent md:hidden"
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {/*  */}
      {isOpen && (
        <nav className="border-t border-rule bg-canvas md:hidden">
          <Container>
            <ul className="flex flex-col gap-1 py-4">
              {primaryNavigation.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 text-base font-medium transition-colors ${
                        isActive ? "text-accent" : "text-body hover:text-accent"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}

export default Header;
