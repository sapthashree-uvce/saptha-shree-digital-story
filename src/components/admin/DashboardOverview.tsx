import {
  FolderGit2,
  Layers,
  Award,
  Trophy,
  CheckCircle2,
  FileEdit,
  Plus,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Clock,
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Button } from "@/components/ui/button";
import type { AdminTab } from "./AdminSidebar";

type DashboardOverviewProps = {
  onNavigateTab: (tab: AdminTab) => void;
};

export function DashboardOverview({ onNavigateTab }: DashboardOverviewProps) {
  const { portfolio } = usePortfolio();

  const totalProjects = portfolio.projects.length;
  const publishedProjects = portfolio.projects.filter((p) => p.published).length;
  const draftProjects = totalProjects - publishedProjects;

  const totalSkills = portfolio.skills.length;
  const visibleSkills = portfolio.skills.filter((s) => s.visible).length;
  const draftSkills = totalSkills - visibleSkills;

  const totalCertifications = portfolio.certificates.length;
  const publishedCertificates = portfolio.certificates.filter((c) => c.published).length;
  const draftCertificates = totalCertifications - publishedCertificates;

  const totalAchievements = portfolio.achievements.length;
  const publishedAchievements = portfolio.achievements.filter((a) => a.published).length;
  const draftAchievements = totalAchievements - publishedAchievements;

  const totalPublished =
    publishedProjects + visibleSkills + publishedCertificates + publishedAchievements;
  const totalDrafts = draftProjects + draftSkills + draftCertificates + draftAchievements;

  const stats = [
    {
      title: "Total Projects",
      value: totalProjects,
      hint: `${publishedProjects} published · ${draftProjects} draft`,
      icon: FolderGit2,
      tab: "projects" as AdminTab,
      highlight: true,
    },
    {
      title: "Total Skills",
      value: totalSkills,
      hint: `${visibleSkills} visible · across ${portfolio.skillCategories.length} categories`,
      icon: Layers,
      tab: "skills" as AdminTab,
    },
    {
      title: "Certifications",
      value: totalCertifications,
      hint: `${publishedCertificates} active credentials`,
      icon: Award,
      tab: "certifications" as AdminTab,
    },
    {
      title: "Achievements",
      value: totalAchievements,
      hint: `${publishedAchievements} honors & recognitions`,
      icon: Trophy,
      tab: "achievements" as AdminTab,
    },
    {
      title: "Published Items",
      value: totalPublished,
      hint: "Live on public portfolio",
      icon: CheckCircle2,
      tab: "overview" as AdminTab,
    },
    {
      title: "Draft Content",
      value: totalDrafts,
      hint: "Hidden from visitors",
      icon: FileEdit,
      tab: "overview" as AdminTab,
    },
  ];

  // Recently updated projects/skills/items
  const recentItems = [
    ...portfolio.projects.map((p) => ({
      type: "Project",
      title: p.title,
      time: p.updatedAt,
      status: p.published ? "Published" : "Draft",
      tab: "projects" as AdminTab,
    })),
    ...portfolio.achievements.map((a) => ({
      type: "Achievement",
      title: a.title,
      time: a.updatedAt,
      status: a.published ? "Published" : "Draft",
      tab: "achievements" as AdminTab,
    })),
    ...portfolio.certificates.map((c) => ({
      type: "Certification",
      title: c.title,
      time: c.updatedAt,
      status: c.published ? "Published" : "Draft",
      tab: "certifications" as AdminTab,
    })),
  ]
    .sort((a, b) => new Date(b.time || 0).getTime() - new Date(a.time || 0).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8 p-5 sm:p-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-ink p-8 text-ink-foreground shadow-card sm:p-10">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-soft px-3.5 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" />
            <span>Interactive Portfolio Control Center</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
            Welcome, <span className="serif-accent text-primary">Saptha Shree</span>
          </h2>
          <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
            All updates made through this interface synchronize dynamically with your
            live portfolio. Projects, skills, credentials and contact details update in real-time.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              onClick={() => onNavigateTab("projects")}
              className="h-11 rounded-full bg-primary px-6 font-bold text-primary-foreground shadow-orange hover:bg-primary/90"
            >
              <Plus className="mr-2 size-4" /> Add New Project
            </Button>
            <Button
              onClick={() => onNavigateTab("skills")}
              variant="outline"
              className="h-11 rounded-full border-ink-line bg-ink-soft text-ink-foreground hover:bg-ink hover:text-primary"
            >
              <Plus className="mr-2 size-4" /> Add Skill
            </Button>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-ink-line px-5 text-sm font-semibold text-ink-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <span>View Public Site</span>
              <ExternalLink className="size-4" />
            </a>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="pointer-events-none absolute -right-10 -top-10 size-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Summary Statistic Cards */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
            Dynamic Overview Metrics
          </h3>
          <span className="eyebrow text-xs text-muted-foreground">Source: Database &amp; Storage</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                onClick={() => onNavigateTab(s.tab)}
                className={`group cursor-pointer rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card ${
                  s.highlight
                    ? "border-primary/40 bg-card hover:border-primary"
                    : "border-border bg-card hover:border-foreground/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {s.title}
                  </span>
                  <span className="grid size-9 place-items-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-4" />
                  </span>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-extrabold text-foreground">
                    {s.value}
                  </span>
                </div>
                <p className="mt-2 text-xs font-medium text-muted-foreground">{s.hint}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Action Matrix & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Quick Action Hub */}
        <div className="space-y-4 lg:col-span-6">
          <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
            Quick Actions
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "Manage Projects",
                desc: "Edit or publish builds",
                tab: "projects" as AdminTab,
                icon: FolderGit2,
              },
              {
                title: "Manage Skills",
                desc: "Update tech stack",
                tab: "skills" as AdminTab,
                icon: Layers,
              },
              {
                title: "Edit Biography",
                desc: "Update CGPA & facts",
                tab: "about" as AdminTab,
                icon: FileEdit,
              },
              {
                title: "Certifications",
                desc: "Add certificates & links",
                tab: "certifications" as AdminTab,
                icon: Award,
              },
            ].map((qa) => {
              const Icon = qa.icon;
              return (
                <button
                  key={qa.title}
                  type="button"
                  onClick={() => onNavigateTab(qa.tab)}
                  className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 text-left transition-all duration-300 hover:border-primary hover:shadow-card"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                      {qa.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{qa.desc}</p>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Recently Updated Feed */}
        <div className="space-y-4 lg:col-span-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
              Recently Updated Content
            </h3>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3.5" /> Latest
            </span>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
            {recentItems.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No recent activity recorded yet.
              </p>
            ) : (
              <div className="divide-y divide-border">
                {recentItems.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => onNavigateTab(item.tab)}
                    className="group flex cursor-pointer items-center justify-between py-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="min-w-0 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">
                          {item.type}
                        </span>
                        <p className="truncate text-sm font-bold text-foreground group-hover:text-primary">
                          {item.title}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {item.time ? new Date(item.time).toLocaleDateString() : "Active"}
                      </span>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        item.status === "Published"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
