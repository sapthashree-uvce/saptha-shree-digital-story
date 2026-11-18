import { Award, ArrowUpRight, Clock } from "lucide-react";

import { CERTIFICATES, type Certificate } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function CertificateCard({ cert, index }: { cert: Certificate; index: number }) {
  const body = (
    <>
      <div className="flex items-start justify-between">
        <span className="grid size-12 place-items-center rounded-full border border-border bg-background text-primary">
          <Award className="size-5" />
        </span>
        <span className="eyebrow text-muted-foreground">No. {String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="mt-10">
        <p className="eyebrow mb-2 text-muted-foreground">{cert.issuer}</p>
        <h3 className="font-display text-2xl normal-case tracking-tight">{cert.title}</h3>
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-dashed border-border pt-5 text-sm font-semibold">
        {cert.url ? (
          <>
            <span className="transition-colors group-hover:text-primary">View Certificate</span>
            <span className="grid size-9 place-items-center rounded-full bg-ink text-ink-foreground transition-all duration-500 group-hover:rotate-45 group-hover:bg-primary">
              <ArrowUpRight className="size-4" />
            </span>
          </>
        ) : (
          <>
            <span className="text-muted-foreground">Link coming soon</span>
            <Clock className="size-4 text-muted-foreground" />
          </>
        )}
      </div>
    </>
  );

  const shell =
    "group relative flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-card transition-all duration-500 sm:p-7";

  return cert.url ? (
    <a
      href={cert.url}
      target="_blank"
      rel="noreferrer"
      className={`${shell} hover:-translate-y-1.5 hover:border-primary`}
      aria-label={`View ${cert.title} certificate from ${cert.issuer}`}
    >
      {body}
    </a>
  ) : (
    <div className={shell}>{body}</div>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          label="Certifications"
          aside={<p className="font-display text-7xl text-foreground/10">0{CERTIFICATES.length}</p>}
        >
          Learning never <span className="serif-accent text-primary">stops.</span>
        </SectionHeading>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATES.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 80} className={i === 0 ? "lg:row-span-1" : undefined}>
              <CertificateCard cert={cert} index={i} />
            </Reveal>
          ))}
          <Reveal delay={CERTIFICATES.length * 80}>
            <div className="flex h-full min-h-[14rem] flex-col justify-end rounded-3xl bg-ink p-7 text-ink-foreground">
              <p className="serif-accent text-3xl leading-tight">
                Every workshop is a <span className="text-primary">new chapter.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
