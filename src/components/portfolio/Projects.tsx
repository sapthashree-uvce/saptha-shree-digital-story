import { useState } from "react";

import { MINI_PROJECTS, PROJECTS } from "@/lib/portfolio-data";
import { usePortfolio } from "@/context/PortfolioContext";
import { cn } from "@/lib/utils";
import { GithubIcon } from "./BrandIcon";
import { ProjectCard, TechTag } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function MiniProjects() {
  const { portfolio } = usePortfolio();
  const mini = portfolio?.miniProjects || MINI_PROJECTS;
  const [active, setActive] = useState(0);

  return (
    <div className="grain relative overflow-hidden rounded-[2rem] bg-ink p-6 text-ink-foreground sm:p-10 lg:p-14">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="font-display text-5xl text-primary">03</span>
            <span className="eyebrow text-ink-muted">Collection · {mini.items.length} builds</span>
          </div>
          <h3 className="mt-6 font-display text-4xl sm:text-5xl">
            Python <span className="serif-accent text-primary">mini</span> projects
          </h3>
          <p className="mt-4 max-w-md leading-relaxed text-ink-foreground/70">{mini.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {mini.tags.map((t) => (
              <TechTag key={t} tone="dark">
                {t}
              </TechTag>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ol className="border-t border-ink-line">
            {mini.items.map((item, i) => (
              <li key={item.name}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className="group grid w-full grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-ink-line py-6 text-left"
                >
                  <span className={cn("eyebrow transition-colors", active === i ? "text-primary" : "text-ink-muted")}>
                    0{i + 1}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block truncate font-display text-2xl transition-all duration-500 sm:text-3xl",
                        active === i ? "translate-x-2 text-ink-foreground" : "text-ink-foreground/50",
                      )}
                    >
                      {item.name}
                    </span>
                    <span
                      className={cn(
                        "grid transition-all duration-500",
                        active === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <span className="overflow-hidden pl-2 pt-1 text-sm text-ink-muted">{item.hint}</span>
                    </span>
                  </span>
                  <span
                    className={cn(
                      "size-3 rounded-full transition-all duration-500",
                      active === i ? "scale-100 bg-primary" : "scale-50 bg-ink-foreground/20",
                    )}
                  />
                </button>
              </li>
            ))}
          </ol>
          <a
            href={mini.github}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-full border border-ink-foreground/25 px-5 text-sm font-semibold transition-all duration-300 hover:border-ink-foreground hover:bg-ink-foreground hover:text-ink"
          >
            <GithubIcon /> Browse on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const { portfolio } = usePortfolio();
  const publishedProjects = (portfolio?.projects || []).filter((p) => p.published);
  const displayProjects = portfolio ? publishedProjects : PROJECTS;
  const mini = portfolio?.miniProjects;

  const [first, second, ...rest] = displayProjects;

  if (displayProjects.length === 0 && (!mini || mini.items.length === 0)) {
    return null;
  }

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          label="Featured projects"
          aside={
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Things I've built and am building — from solar dashboards to drone vision.
            </p>
          }
        >
          Ideas into <span className="serif-accent text-primary">reality.</span>
        </SectionHeading>

        <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-8">
          {first ? (
            <Reveal className="lg:col-span-7">
              <ProjectCard project={first} aspect="aspect-[16/11]" />
            </Reveal>
          ) : null}
          {second ? (
            <Reveal delay={150} className="lg:col-span-5 lg:mt-40">
              <ProjectCard project={second} aspect="aspect-square" />
            </Reveal>
          ) : null}
          {rest.map((proj, i) => (
            <Reveal key={proj.id || proj.title} delay={200 + i * 80} className="lg:col-span-6">
              <ProjectCard project={proj} aspect="aspect-[16/10]" />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <MiniProjects />
        </Reveal>
      </div>
    </section>
  );
}
