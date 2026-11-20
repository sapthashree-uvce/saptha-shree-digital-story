import { Mail, Lock } from "lucide-react";

import { NAV_LINKS, PROFILE } from "@/lib/portfolio-data";
import { usePortfolio } from "@/context/PortfolioContext";
import { GithubIcon, LinkedinIcon } from "./BrandIcon";
import { BrandMark } from "./Navbar";

export function Footer() {
  const { portfolio, isAdmin } = usePortfolio();
  const contact = portfolio?.contact || PROFILE;

  const socials = [
    { label: "Email", href: `mailto:${contact.email}`, Icon: Mail },
    { label: "GitHub", href: contact.github, Icon: GithubIcon },
    { label: "LinkedIn", href: contact.linkedin, Icon: LinkedinIcon },
  ];
  return (
    <footer className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <div className="grid gap-8 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
        <a href="#home" className="flex items-center gap-2.5">
          <BrandMark />
          <span className="font-display text-lg">{contact.brand}</span>
        </a>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex gap-2">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                className="grid size-10 place-items-center rounded-full border border-border transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10 flex flex-col justify-between gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
        <p>
          Designed &amp; Built by <span className="serif-accent text-base text-foreground">{contact.name || "Saptha Shree"}.</span>
        </p>
        <div className="flex items-center gap-4">
          <p>© {new Date().getFullYear()} · Bengaluru, India</p>
          <a
            href="/admin"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground/60 transition-colors hover:text-foreground"
            title={isAdmin ? "Open Admin Dashboard" : "Admin Login"}
          >
            <Lock className="size-3" />
            <span>{isAdmin ? "Admin Dashboard" : "Admin"}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
