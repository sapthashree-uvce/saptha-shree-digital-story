import beyondDrawing from "@/assets/beyond-drawing.jpg";
import { ABOUT_FACTS, HOBBIES } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
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
          <div className="space-y-6 text-lg leading-relaxed text-ink-foreground/80 lg:col-span-6">
            <Reveal>
              <p className="text-2xl leading-snug text-ink-foreground sm:text-3xl">
                I'm Saptha Shree, a second-year Artificial Intelligence and Data Science student at{" "}
                <span className="serif-accent text-primary">UVCE, Bengaluru.</span>
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p>
                I enjoy exploring technology, understanding how things work, and transforming ideas into practical
                solutions. My interests include Data Engineering, Data Analytics, Artificial Intelligence and
                software development.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p>
                I believe in learning by building, experimenting with new technologies, and continuously improving
                my skills.
              </p>
            </Reveal>

            <Reveal delay={240} className="pt-6">
              <p className="eyebrow mb-4 text-ink-muted">Beyond technology</p>
              <ul className="flex flex-wrap gap-2">
                {HOBBIES.map((h) => (
                  <li
                    key={h}
                    className="rounded-full border border-ink-line px-4 py-2 text-sm text-ink-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
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
                {ABOUT_FACTS.map((fact) => (
                  <div
                    key={fact.label}
                    className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] gap-4 border-t border-ink-line py-4 first-of-type:border-t-0"
                  >
                    <dt className="text-sm text-ink-muted">{fact.label}</dt>
                    <dd className={fact.label === "CGPA" ? "font-display text-3xl text-primary" : "text-sm font-medium"}>
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={260} className="absolute -bottom-10 -left-8 z-20 hidden w-36 sm:block">
              <figure className="-rotate-6 overflow-hidden rounded-2xl border-4 border-ink shadow-float">
                <img src={beyondDrawing} alt="Sketchbook with a pencil drawing" width={1008} height={1008} loading="lazy" className="aspect-square object-cover" />
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
