// Imports
import { Link } from "react-router-dom";
// Components
import Wordmark from "./Wordmark";
import { Container } from "@/components/ui";
// Data
import { primaryNavigation, profile, profileLinks, publisher } from "@/data";

//
function Footer() {
  // Both columns are derived, so a new page or profile link needs no edit here.
  const columns = [
    {
      title: "Publisher",
      links: primaryNavigation.map((item) => ({ ...item, isExternal: false })),
    },
    {
      title: "Elsewhere",
      links: profileLinks.map((link) => ({
        href: link.href,
        label: link.label,
        isExternal: true,
      })),
    },
  ];

  return (
    <footer className="forge-ground on-steel">
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr] md:gap-12 md:py-16">
          {/*  */}
          <div className="max-w-xs">
            <Wordmark onSteel />
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {publisher.description}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Solo-engineered and maintained by {profile.name}.
            </p>
          </div>

          {/*  */}
          {columns.map((column) => (
            <nav key={column.title}>
              <h2 className="font-display text-sm font-semibold text-white">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/*  */}
        <div className="flex flex-col gap-2 border-t border-white/10 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} {publisher.fullName}
          </p>
          <p className="text-sm text-white/50">{publisher.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
