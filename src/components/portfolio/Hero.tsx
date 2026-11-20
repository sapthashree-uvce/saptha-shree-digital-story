import { ArrowDown, Download } from "lucide-react";

import { PROFILE } from "@/lib/portfolio-data";
import { usePortfolio } from "@/context/PortfolioContext";
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
  const { portfolio } = usePortfolio();
  const resumeUrl = portfolio?.about?.resumeUrl || portfolio?.contact?.resumeUrl || PROFILE.resumeUrl;

  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />

      {/* floating decorative elements */}
      <span aria-hidden="true" className="absolute right-[8%] top-28 hidden size-3 animate-float rounded-full bg-primary md:block" />
      <span aria-hidden="true" className="absolute left-[46%] top-[58%] hidden size-2 animate-float-slow rounded-full bg-foreground/40 md:block" />
      <span aria-hidden="true" className="absolute right-[4%] top-[46%] hidden size-24 animate-spin-slow rounded-full border border-dashed border-foreground/20 lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <h1 className="font-display display-mega font-extrabold text-foreground">
          <span className="sr-only">Saptha Shree — AI{"\u00a0"}&amp; DATA SCIENCE student at UVCE Bengaluru, aspiring data engineer.</span>
          <span aria-hidden="true" className="block">
            <Line delay={100}>
              <span className="text-primary">Saptha</span> Shree
            </Line>
            <Line delay={220}>
              <span className="text-primary">AI</span>{"\u00a0"}&amp; DATA SCIENCE
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
              {resumeUrl ? (
                <a
                  href={resumeUrl}
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
