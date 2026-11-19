import { ArrowDown, Download } from "lucide-react";

import { ABOUT_FACTS, MINI_PROJECTS, PROFILE, PROJECTS } from "@/lib/portfolio-data";
import { ArrowCircle } from "./ArrowCircle";
import { Reveal } from "./Reveal";

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="line-mask" style={{ ["--line-delay" as string]: `${delay}ms` }}>
      <span>{children}</span>
    </span>
  );
}

export function Hero() {
  const strip = [
    { ...PROJECTS[0]!, tagline: "Frontend & dashboard" },
    { ...PROJECTS[1]!, tagline: "Ongoing · Computer vision" },
    { title: MINI_PROJECTS.title, tagline: "Python fundamentals" },
  ];

  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />

      {/* floating decorative elements */}
      <span aria-hidden="true" className="absolute right-[8%] top-28 hidden size-3 animate-float rounded-full bg-primary md:block" />
      <span aria-hidden="true" className="absolute left-[46%] top-[58%] hidden size-2 animate-float-slow rounded-full bg-foreground/40 md:block" />
      <span aria-hidden="true" className="absolute right-[4%] top-[46%] hidden size-24 animate-spin-slow rounded-full border border-dashed border-foreground/20 lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <h1 className="font-display display-mega font-extrabold text-foreground">
          <span className="sr-only">Saptha Shree — AI &amp; Data Science student at UVCE Bengaluru, aspiring data engineer.</span>
          <span aria-hidden="true" className="block">
            <Line delay={100}>
              <span className="text-primary">Saptha</span> Shree
            </Line>
            <Line delay={220}>
              <span className="text-primary">AI</span> &amp; Data Science
            </Line>
          </span>
        </h1>

        <p className="mt-8 max-w-3xl font-display text-2xl uppercase leading-tight tracking-tight text-foreground sm:text-3xl">
          Second-year student at <span className="text-primary">UVCE, Bengaluru</span> · Aspiring{" "}
          <span className="text-primary">Data Engineer</span>
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <Reveal delay={400} className="flex flex-col gap-5 lg:col-span-5">
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-border bg-card/70 px-4 py-2 text-sm backdrop-blur">
              <span className="size-2.5 animate-pulse-dot rounded-full bg-primary" />
              <span className="font-bold">Open to learning &amp; collaboration</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="group inline-flex h-14 items-center gap-4 rounded-full bg-ink pl-7 pr-2 font-bold text-ink-foreground shadow-float transition-all duration-300 hover:bg-ink-soft"
              >
                Explore My Work
                <ArrowCircle className="size-10" />
              </a>
              {PROFILE.resumeUrl ? (
                <a
                  href={PROFILE.resumeUrl}
                  download="Saptha_Shree_Resume.pdf"
                  className="inline-flex h-14 items-center gap-2 rounded-full border border-foreground/20 px-7 font-bold transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  <Download className="size-4" /> Download Resume
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  title="Resume will be available soon"
                  className="inline-flex h-14 cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-foreground/25 px-7 font-bold text-muted-foreground"
                >
                  <Download className="size-4" /> Resume · coming soon
                </span>
              )}
            </div>
          </Reveal>

          <Reveal delay={520} className="lg:col-span-5 lg:col-start-8">
            <p className="mb-3 text-3xl font-bold text-primary">Hi, I'm Saptha Shree. <span className="font-sans">👋</span></p>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              An <span className="font-bold text-foreground">AI &amp; Data Science</span> student exploring data,
              technology and intelligent solutions. A curious learner who enjoys solving problems and building
              practical solutions with technology.
            </p>
          </Reveal>
        </div>

        {/* Bold at-a-glance facts */}
        <Reveal delay={600} className="mt-14 border-y border-border py-6">
          <dl className="flex flex-wrap gap-x-10 gap-y-5">
            {ABOUT_FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="eyebrow text-muted-foreground">{fact.label}</dt>
                <dd className="mt-1 font-display text-xl uppercase tracking-tight text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Project preview strip, text only */}
        <div className="mt-14 grid gap-5 md:grid-cols-12">
          {strip.map((item, i) => (
            <Reveal
              key={item.title}
              delay={680 + i * 120}
              className={i === 0 ? "md:col-span-6" : "md:col-span-3"}
            >
              <a
                href="#projects"
                className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card/60 p-6 transition-all duration-300 hover:border-foreground/40 hover:bg-card"
              >
                <span className="eyebrow text-muted-foreground">0{i + 1}</span>
                <span className="mt-10 block">
                  <span className="block font-display text-2xl uppercase tracking-tight text-foreground">
                    {item.title}
                    <sup className="text-primary">®</sup>
                  </span>
                  <span className="mt-1 block text-sm font-bold text-muted-foreground">{item.tagline}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <a href="#about" className="mt-14 flex items-center gap-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
          <span className="grid size-10 place-items-center rounded-full border border-border">
            <ArrowDown className="size-4 animate-float" />
          </span>
          Scroll to know me
        </a>
      </div>
    </section>
  );
}
