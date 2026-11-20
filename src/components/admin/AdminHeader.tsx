import { Menu, ExternalLink, LogOut, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/context/PortfolioContext";
import type { AdminTab } from "./AdminSidebar";

type AdminHeaderProps = {
  activeTab: AdminTab;
  onOpenMobile: () => void;
};

const TAB_TITLES: Record<AdminTab, { title: string; subtitle: string }> = {
  overview: {
    title: "Dashboard Overview",
    subtitle: "High-level summary, recent activity & key metrics",
  },
  projects: {
    title: "Manage Projects",
    subtitle: "Create, update, publish and prioritize portfolio projects",
  },
  skills: {
    title: "Manage Skills & Tools",
    subtitle: "Organize technical proficiencies by categories and order",
  },
  about: {
    title: "Manage About Me",
    subtitle: "Personal biography, education details, CGPA and resume link",
  },
  achievements: {
    title: "Manage Achievements",
    subtitle: "Hackathons, competitions and recognition highlights",
  },
  certifications: {
    title: "Manage Certifications",
    subtitle: "Verified credentials, issuing organizations and verification links",
  },
  activities: {
    title: "Manage Activities & Involvement",
    subtitle: "Student clubs, design teams, workshops and community events",
  },
  contact: {
    title: "Manage Contact Information",
    subtitle: "Email, GitHub, LinkedIn and external social presence",
  },
};

export function AdminHeader({ activeTab, onOpenMobile }: AdminHeaderProps) {
  const { logout } = usePortfolio();
  const info = TAB_TITLES[activeTab];

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-background/95 px-5 backdrop-blur sm:px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onOpenMobile}
          className="grid size-10 place-items-center rounded-xl border border-border text-foreground hover:bg-muted lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="size-5" />
        </button>

        <div>
          <h1 className="font-display text-xl font-bold uppercase tracking-tight text-foreground sm:text-2xl">
            {info.title}
          </h1>
          <p className="hidden text-xs font-medium text-muted-foreground sm:block">
            {info.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground md:flex">
          <CheckCircle className="size-3.5 text-emerald-500" />
          <span>Sync Active</span>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3.5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary sm:h-10 sm:px-4 sm:text-sm"
        >
          <span>Preview Site</span>
          <ExternalLink className="size-3.5" />
        </a>

        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="size-9 rounded-full p-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive sm:size-10"
          title="Logout"
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    </header>
  );
}
