import { PROJECTS } from "@/lib/portfolio-data";
import { usePortfolio } from "@/context/PortfolioContext";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  const { portfolio } = usePortfolio();
  const publishedProjects = (portfolio?.projects || []).filter((p) => p.published);
  const displayProjects = portfolio ? publishedProjects : PROJECTS;
  const [first, second, ...rest] = displayProjects;

  if (displayProjects.length === 0) {
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
            <Reveal key={proj.title} delay={200 + i * 80} className="lg:col-span-6">
              <ProjectCard project={proj} aspect="aspect-[16/10]" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
