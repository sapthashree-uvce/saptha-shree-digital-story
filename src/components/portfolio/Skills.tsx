import { INTERESTS, SKILL_GROUPS } from "@/lib/portfolio-data";
import { usePortfolio } from "@/context/PortfolioContext";
import { BrandIcon } from "./BrandIcon";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  const { portfolio } = usePortfolio();
  const visibleSkills = (portfolio?.skills || []).filter((s) => s.visible);
  const interests = portfolio?.interests || INTERESTS;

  // Group visible skills by category
  const categoriesInUse = Array.from(new Set(visibleSkills.map((s) => s.category)));
  const dynamicGroups = portfolio
    ? categoriesInUse.map((cat) => ({
        title: cat,
        note:
          cat === "Programming Languages"
            ? "The foundations"
            : cat.includes("Data") || cat.includes("Libraries")
            ? "Working with data"
            : cat.includes("Development")
            ? "Everyday workflow"
            : cat.includes("Design")
            ? "Ideas, presented"
            : "Technical stack",
        skills: visibleSkills
          .filter((s) => s.category === cat)
          .sort((a, b) => a.displayOrder - b.displayOrder),
      }))
    : SKILL_GROUPS;
  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          label="Technical skills"
          aside={
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Languages, libraries and tools I use to learn, experiment and build — grouped by what they help me do.
            </p>
          }
        >
          Tools I <span className="serif-accent text-primary">work</span> with.
        </SectionHeading>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          {dynamicGroups.map((group, gi) => (
            <Reveal
              key={group.title}
              delay={gi * 90}
              className={[
                "lg:col-span-5",
                "lg:col-span-7",
                "lg:col-span-7",
                "lg:col-span-5",
              ][gi % 4]}
            >
              <article className="group h-full rounded-3xl border border-border bg-card p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-foreground/30 sm:p-8">
                <header className="mb-8 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="eyebrow mb-2 text-muted-foreground">{group.note}</p>
                    <h3 className="font-display text-2xl normal-case tracking-tight">{group.title}</h3>
                  </div>
                  <span className="font-display shrink-0 text-4xl text-foreground/10 transition-colors duration-500 group-hover:text-primary">
                    0{gi + 1}
                  </span>
                </header>
                <ul className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center gap-2.5 rounded-full border border-border bg-background py-2 pl-2 pr-4 text-sm font-medium transition-all duration-300 hover:border-primary hover:text-primary"
                    >
                      <span className="grid size-8 place-items-center rounded-full bg-muted">
                        <BrandIcon icon={skill.icon} className="size-4" />
                      </span>
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-20 overflow-hidden border-y border-border bg-background py-6" aria-label="Areas of interest">
        <p className="sr-only">Areas of interest: {interests.join(", ")}</p>
        <div aria-hidden="true" className="flex w-max animate-marquee gap-10">
          {[...interests, ...interests, ...interests, ...interests].map((interest, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-4xl sm:text-5xl">
              <span className={i % 2 === 0 ? "text-foreground" : "serif-accent text-muted-foreground"}>{interest}</span>
              <span className="size-3 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
