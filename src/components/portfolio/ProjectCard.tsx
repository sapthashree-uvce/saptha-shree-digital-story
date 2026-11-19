import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Project } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { GithubIcon } from "./BrandIcon";

export function TechTag({ children, tone = "light" }: { children: string; tone?: "light" | "dark" }) {
  return (
    <li
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium",
        tone === "dark" ? "border-ink-line text-ink-foreground/80" : "border-border text-muted-foreground",
      )}
    >
      {children}
    </li>
  );
}

export function StatusBadge({ status }: { status: Project["status"] }) {
  return status === "ongoing" ? (
    <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
      <span className="size-1.5 animate-pulse-dot rounded-full bg-primary-foreground" /> Ongoing
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur">
      Completed
    </span>
  );
}

type ProjectCardProps = {
  project: Project;
  aspect: string;
  className?: string;
};

export function ProjectCard({ project, aspect, className }: ProjectCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <article className={cn("group", className)}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative block w-full overflow-hidden rounded-3xl bg-ink text-left"
        aria-label={`View details for ${project.title}`}
      >
        <div className={cn("relative grid place-items-center overflow-hidden px-6 text-center", aspect)}>
          <span
            aria-hidden="true"
            className="font-display text-7xl leading-none text-ink-foreground/10 transition-transform duration-[1.4s] ease-out group-hover:scale-110 sm:text-9xl"
          >
            {project.number}
          </span>
          <span className="mt-4 block font-display text-3xl uppercase tracking-tight text-ink-foreground sm:text-4xl">
            {project.title}
          </span>
          <span className="serif-accent mt-1 block text-xl text-primary">{project.subtitle}</span>
        </div>
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
          <StatusBadge status={project.status} />
        </div>
        <span className="absolute bottom-5 right-5 grid size-14 translate-y-4 place-items-center rounded-full bg-primary text-primary-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-6" />
        </span>
      </button>

      <div className="mt-6 grid gap-4">
        <div>
          <h3 className="font-display text-3xl uppercase tracking-tight sm:text-4xl">{project.title}</h3>
          <p className="serif-accent mt-1 text-xl text-muted-foreground">{project.subtitle}</p>
        </div>
        <p className="max-w-xl leading-relaxed text-muted-foreground">{project.description}</p>
        <ul className="flex flex-wrap gap-2" aria-label="Technologies">
          {project.tags.map((t) => (
            <TechTag key={t}>{t}</TechTag>
          ))}
        </ul>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-ink-foreground transition-all duration-300 hover:bg-primary"
          >
            View Project <ArrowUpRight className="size-4" />
          </button>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-foreground/20 px-5 text-sm font-bold transition-all duration-300 hover:border-foreground"
          >
            <GithubIcon /> {project.githubLabel}
          </a>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl overflow-hidden rounded-3xl border-border bg-card p-0">
          <div className="grid gap-5 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="eyebrow text-primary">Project {project.number}</span>
              <StatusBadge status={project.status} />
            </div>
            <div>
              <DialogTitle className="font-display text-3xl uppercase tracking-tight">{project.title}</DialogTitle>
              <p className="serif-accent text-xl text-muted-foreground">{project.subtitle}</p>
            </div>
            <DialogDescription className="leading-relaxed text-muted-foreground">{project.description}</DialogDescription>
            <div className="rounded-2xl bg-muted p-4">
              <p className="eyebrow mb-1 text-muted-foreground">My contribution</p>
              <p className="font-bold">{project.contribution}</p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <TechTag key={t}>{t}</TechTag>
              ))}
            </ul>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-orange transition-transform hover:-translate-y-0.5"
            >
              <GithubIcon /> {project.githubLabel}
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}
