import {
  LayoutDashboard,
  FolderGit2,
  Layers,
  UserCircle,
  Trophy,
  Award,
  CalendarCheck,
  Mail,
  ArrowLeft,
  LogOut,
  X,
} from "lucide-react";
import { BrandMark } from "@/components/portfolio/Navbar";
import { cn } from "@/lib/utils";
import { usePortfolio } from "@/context/PortfolioContext";

export type AdminTab =
  | "overview"
  | "projects"
  | "skills"
  | "about"
  | "achievements"
  | "certifications"
  | "activities"
  | "contact";

type AdminSidebarProps = {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

export function AdminSidebar({
  activeTab,
  onSelectTab,
  mobileOpen,
  onCloseMobile,
}: AdminSidebarProps) {
  const { logout, portfolio, adminUser } = usePortfolio();

  const navItems: { id: AdminTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
    {
      id: "projects",
      label: "Manage Projects",
      icon: FolderGit2,
      badge: portfolio.projects.length,
    },
    {
      id: "skills",
      label: "Manage Skills",
      icon: Layers,
      badge: portfolio.skills.length,
    },
    { id: "about", label: "Manage About Me", icon: UserCircle },
    {
      id: "achievements",
      label: "Manage Achievements",
      icon: Trophy,
      badge: portfolio.achievements.length,
    },
    {
      id: "certifications",
      label: "Manage Certifications",
      icon: Award,
      badge: portfolio.certificates.length,
    },
    {
      id: "activities",
      label: "Manage Activities",
      icon: CalendarCheck,
      badge: portfolio.activities.length,
    },
    { id: "contact", label: "Manage Contact Information", icon: Mail },
  ];

  const handleNavClick = (tab: AdminTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-ink-line bg-ink text-ink-foreground transition-transform duration-300 lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header Branding */}
        <div className="flex h-20 items-center justify-between border-b border-ink-line px-6">
          <div className="flex items-center gap-3">
            <BrandMark />
            <div>
              <span className="block font-display text-lg font-bold tracking-tight text-ink-foreground">
                {portfolio.contact.brand || "SAPTHA"}
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-widest text-primary">
                Admin Dashboard
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-ink-muted hover:bg-ink-soft hover:text-ink-foreground lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* User Info Capsule */}
        <div className="border-b border-ink-line p-4">
          <div className="flex items-center gap-3 rounded-2xl bg-ink-soft p-3">
            <div className="grid size-9 place-items-center rounded-xl bg-primary font-display font-bold text-primary-foreground">
              {adminUser?.email?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-ink-foreground">
                {adminUser?.email || "Admin"}
              </p>
              <div className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] uppercase tracking-wider text-ink-muted">
                  Authorized
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4" aria-label="Admin Navigation">
          <p className="eyebrow px-3 pb-2 text-[10px] text-ink-muted">Content Modules</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "group flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-orange"
                    : "text-ink-muted hover:bg-ink-soft hover:text-ink-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "size-4 shrink-0 transition-colors",
                      isActive
                        ? "text-primary-foreground"
                        : "text-ink-muted group-hover:text-primary"
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-bold",
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-ink-soft text-ink-muted group-hover:text-ink-foreground"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="border-t border-ink-line p-4 space-y-2">
          <a
            href="/"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-ink-muted transition-colors hover:bg-ink-soft hover:text-ink-foreground"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Portfolio</span>
          </a>
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold text-rose-400 transition-colors hover:bg-rose-500/10 hover:text-rose-300"
          >
            <LogOut className="size-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
