import { ArrowDown, Download } from "lucide-react";

import beyondChess from "@/assets/beyond-chess.jpg";
import { PROFILE, PROJECTS, MINI_PROJECTS } from "@/lib/portfolio-data";
import lumenSweep from "@/assets/project-lumen-sweep.jpg";
import { ArrowCircle } from "./ArrowCircle";
import { Reveal } from "./Reveal";

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="line-mask" style={{ ["--line-delay" as string]: `${delay}ms` }}>
      <span>{children}</span>
    </span>
  );
}

function ImagePill({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <span
      className={`inline-block h-[0.72em] w-[1.7em] translate-y-[-0.06em] overflow-hidden rounded-full align-middle shadow-card ${className ?? ""}`}
    >
      <img src={src} alt={alt} className="size-full object-cover" width={400} height={200} />
    </span>
  );
}

export function Hero() {
  const strip = [
    { ...PROJECTS[0]!, tagline: "Frontend & dashboard" },
    { ...PROJECTS[1]!, tagline: "Ongoing · Computer vision" },
    {
      title: MINI_PROJECTS.title,
      subtitle: "Five small builds",
      image: MINI_PROJECTS.image,
      imageWidth: MINI_PROJECTS.imageWidth,
      imageHeight: MINI_PROJECTS.imageHeight,
      tagline: "Python fundamentals",
    },
  ];

  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />

      {/* floating decorative elements */}
      <span aria-hidden="true" className="absolute right-[8%] top-28 hidden size-3 animate-float rounded-full bg-primary md:block" />
      <span aria-hidden="true" className="absolute left-[46%] top-[58%] hidden size-2 animate-float-slow rounded-full bg-foreground/40 md:block" />
      <span aria-hidden="true" className="absolute right-[4%] top-[46%] hidden size-24 animate-spin-slow rounded-full border border-dashed border-foreground/20 lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <h1 className="relative font-display display-mega text-foreground">
          <span className="sr-only">Building with technology. Thinking beyond limits.</span>
          <span aria-hidden="true" className="block">
            <Line delay={100}>
              <span className="text-primary">Building</span> with{" "}
              <ImagePill src={lumenSweep} alt="" />
            </Line>
            <Line delay={220}>
              <span className="hidden w-[1.08em] sm:inline-block" />
              <span className="text-primary">Technology.</span>
            </Line>
            <Line delay={340}>
              <span className="text-primary">Thinking</span> <ImagePill src={beyondChess} alt="" />
            </Line>
            <Line delay={460}>
              <span className="serif-accent text-muted-foreground sm:pl-[1.08em] lg:pl-[2.6em]">beyond limits.</span>
            </Line>
          </span>

          {/* Profile placeholder card, overlapping the lines like an editorial cut-out */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-[0.78em] hidden h-[1.22em] w-[0.98em] animate-float sm:block [--float-rotate:-7deg]"
          >
            <span className="grid size-full place-items-center overflow-hidden rounded-[0.14em] border-[0.035em] border-background bg-ink shadow-float">
              <span className="serif-accent text-[0.46em] leading-none text-primary">SS</span>
              <span className="absolute bottom-[0.5em] font-sans text-[0.06em] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                Saptha Shree
              </span>
            </span>
          </span>
        </h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <Reveal delay={400} className="flex flex-col gap-5 lg:col-span-5">
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-border bg-card/70 px-4 py-2 text-sm backdrop-blur">
              <span className="size-2.5 animate-pulse-dot rounded-full bg-primary" />
              <span className="font-medium">Open to learning &amp; collaboration</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="group inline-flex h-14 items-center gap-4 rounded-full bg-ink pl-7 pr-2 font-semibold text-ink-foreground shadow-float transition-all duration-300 hover:bg-ink-soft"
              >
                Explore My Work
                <ArrowCircle className="size-10" />
              </a>
              {PROFILE.resumeUrl ? (
                <a
                  href={PROFILE.resumeUrl}
                  download="Saptha_Shree_Resume.pdf"
                  className="inline-flex h-14 items-center gap-2 rounded-full border border-foreground/20 px-7 font-semibold transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  <Download className="size-4" /> Download Resume
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  title="Resume will be available soon"
                  className="inline-flex h-14 cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-foreground/25 px-7 font-semibold text-muted-foreground"
                >
                  <Download className="size-4" /> Resume · coming soon
                </span>
              )}
            </div>
          </Reveal>

          <Reveal delay={520} className="lg:col-span-5 lg:col-start-8">
            <p className="serif-accent mb-3 flex items-center gap-2 text-3xl text-primary">
              Hi, I'm Saptha Shree. <span className="not-italic">👋</span>
            </p>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              An AI &amp; Data Science student exploring data, technology and intelligent solutions. A curious
              learner who enjoys solving problems and building practical solutions with technology.
            </p>
          </Reveal>
        </div>

        {/* Project preview strip, like an agency case-study row */}
        <div className="mt-16 grid gap-5 md:grid-cols-12">
          {strip.map((item, i) => (
            <Reveal
              key={item.title}
              delay={600 + i * 120}
              className={i === 0 ? "md:col-span-6" : "md:col-span-3"}
            >
              <a href="#projects" className="group block">
                <div className={`overflow-hidden rounded-2xl bg-ink ${i === 0 ? "aspect-[16/10]" : "aspect-[4/3] md:aspect-[4/3.4]"}`}>
                  <img
                    src={item.image}
                    alt={`${item.title} preview`}
                    width={item.imageWidth}
                    height={item.imageHeight}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="size-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{item.title}<sup className="text-primary">®</sup></p>
                    <p className="truncate text-sm text-muted-foreground">{item.tagline}</p>
                  </div>
                  <span className="eyebrow shrink-0 pt-1 text-muted-foreground">0{i + 1}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <a href="#about" className="mt-14 flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <span className="grid size-10 place-items-center rounded-full border border-border">
            <ArrowDown className="size-4 animate-float" />
          </span>
          Scroll to know me
        </a>
      </div>
    </section>
  );
}
