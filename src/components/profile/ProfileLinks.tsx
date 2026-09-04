// Imports
import { ArrowUpRight } from "lucide-react";
// Data
import { profileLinks } from "@/data";

//
function ProfileLinks() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {profileLinks.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-full items-center justify-between gap-4 rounded-2xl border border-rule bg-surface p-5 transition-colors hover:border-accent/45"
          >
            <span>
              <span className="block font-display font-semibold text-ink">
                {link.label}
              </span>
              <span className="mt-0.5 block text-sm text-muted">{link.handle}</span>
            </span>
            <ArrowUpRight className="size-4 shrink-0 text-accent" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default ProfileLinks;
