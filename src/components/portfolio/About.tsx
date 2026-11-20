import { ABOUT_FACTS, HOBBIES } from "@/lib/portfolio-data";
import { usePortfolio } from "@/context/PortfolioContext";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  const { portfolio } = usePortfolio();
  const about = portfolio?.about;
  const facts = about?.facts || ABOUT_FACTS;
  const hobbies = about?.hobbies || HOBBIES;
  const paragraphs = about?.bioParagraphs;
  return (
    <section id="about" className="px-3 sm:px-5">
      <div className="grain relative mx-auto max-w-[88rem] overflow-hidden rounded-[2rem] bg-ink px-5 py-20 text-ink-foreground sm:px-10 sm:py-28 lg:px-16">
        <span aria-hidden="true" className="pointer-events-none absolute -right-10 top-10 select-none font-display text-[22vw] leading-none text-ink-foreground/[0.03] lg:text-[15rem]">
          ABOUT
        </span>

        <SectionHeading index="01" label="About me" tone="dark">
          A little <span className="serif-accent text-primary">about</span> me.
        </SectionHeading>

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <div className="space-y-6 text-lg leading-relaxed text-ink-foreground/90 lg:col-span-6">
            <Reveal>
              <p className="text-2xl leading-snug text-ink-foreground sm:text-3xl">
                I'm <span className="font-bold text-primary">Saptha Shree</span>, a second-year{" "}
                <span className="font-bold text-ink-foreground">Artificial Intelligence and Data Science</span>{" "}
                student at <span className="font-bold text-primary">UVCE, Bengaluru.</span>
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p>
                I enjoy exploring technology, understanding how things work, and transforming ideas into practical
                solutions. My interests include{" "}
                <span className="font-bold text-ink-foreground">Data Engineering, Data Analytics, Artificial
                Intelligence</span> and software development.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p>
                I believe in <span className="font-bold text-ink-foreground">learning by building</span>, experimenting
                with new technologies, and continuously improving my skills.
              </p>
            </Reveal>

            <Reveal delay={240} className="pt-6">
              <p className="eyebrow mb-4 text-ink-muted">Beyond technology</p>
              <ul className="flex flex-wrap gap-2">
                {hobbies.map((h) => (
                  <li
                    key={h}
                    className="rounded-full border border-ink-line px-4 py-2 text-sm font-bold text-ink-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="relative lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <dl className="relative z-10 rounded-3xl border border-ink-line bg-ink-soft/80 p-6 backdrop-blur sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <span className="eyebrow text-ink-muted">Quick facts</span>
                  <span className="size-2 rounded-full bg-primary" />
                </div>
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] gap-4 border-t border-ink-line py-4 first-of-type:border-t-0"
                  >
                    <dt className="text-sm font-semibold text-ink-muted">{fact.label}</dt>
                    <dd
                      className={
                        fact.label === "CGPA"
                          ? "font-display text-3xl text-primary"
                          : "text-sm font-bold text-ink-foreground"
                      }
                    >
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
