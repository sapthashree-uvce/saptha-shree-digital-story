import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { NAV_LINKS, PROFILE } from "@/lib/portfolio-data";
import { usePortfolio } from "@/context/PortfolioContext";
import { cn } from "@/lib/utils";
import { ArrowCircle } from "./ArrowCircle";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("grid grid-cols-2 gap-[3px]", className)}>
      <span className="size-[7px] rounded-full bg-current" />
      <span className="size-[7px] rounded-full bg-primary" />
      <span className="size-[7px] rounded-full bg-current" />
      <span className="size-[7px] rounded-full bg-current" />
    </span>
  );
}

function useActiveSection() {
  const [active, setActive] = useState<string>("home");
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (s): s is HTMLElement => s !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return active;
}

export function Navbar() {
  const { portfolio } = usePortfolio();
  const contact = portfolio?.contact || PROFILE;
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5",
      )}
    >
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-full px-4 transition-all duration-500 sm:px-6 lg:grid-cols-[auto_minmax(0,1fr)_auto]",
          scrolled ? "mx-3 border border-border/70 bg-background/80 py-2 shadow-card backdrop-blur-xl sm:mx-6 lg:mx-auto" : "py-2",
        )}
      >
        <a href="#home" className="flex min-w-0 items-center gap-2.5 text-foreground" aria-label={`${contact.name || PROFILE.name} — home`}>
          <BrandMark className="shrink-0" />
          <span className="truncate font-display text-lg tracking-tight">{contact.brand || PROFILE.brand}</span>
        </a>

        <ul className="hidden items-center justify-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                data-active={active === link.id}
                className={cn(
                  "link-underline text-sm font-medium transition-colors",
                  active === link.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="group hidden h-11 items-center gap-3 rounded-full bg-ink pl-5 pr-1.5 text-sm font-semibold text-ink-foreground transition-all duration-300 hover:bg-ink-soft sm:inline-flex"
          >
            Let's Talk
            <ArrowCircle className="size-8" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid size-11 place-items-center rounded-full border border-border bg-card text-foreground lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="size-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-ink px-6 pb-10 pt-6 text-ink-foreground transition-all duration-500 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2.5">
            <BrandMark />
            <span className="font-display text-lg">{contact.brand || PROFILE.brand}</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid size-11 place-items-center rounded-full border border-ink-line"
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
          >
            <X className="size-5" />
          </button>
        </div>
        <ul className="mt-14 flex flex-col gap-2">
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.id}
              className={cn("transition-all duration-500", open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0")}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
            >
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="flex items-baseline gap-4 border-b border-ink-line py-3 font-display text-4xl"
              >
                <span className="eyebrow text-primary">0{i + 1}</span>
                <span className={active === link.id ? "text-primary" : undefined}>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
          className="group mt-auto inline-flex h-14 items-center justify-between rounded-full bg-primary pl-6 pr-2 font-semibold text-primary-foreground"
        >
          Let's Talk
          <ArrowCircle className="bg-ink" />
        </a>
      </div>
    </header>
  );
}
