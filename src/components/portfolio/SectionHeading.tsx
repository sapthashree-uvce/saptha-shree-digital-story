import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  aside?: ReactNode;
};

export function SectionHeading({ index, label, children, tone = "light", className, aside }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end", className)}>
      <div className="min-w-0">
        <Reveal>
          <p className={cn("eyebrow mb-6 flex items-center gap-3", dark ? "text-ink-muted" : "text-muted-foreground")}>
            <span className="text-primary">{index}</span>
            <span className={cn("h-px w-10", dark ? "bg-ink-foreground/25" : "bg-foreground/25")} />
            {label}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className={cn("font-display display-huge", dark ? "text-ink-foreground" : "text-foreground")}>{children}</h2>
        </Reveal>
      </div>
      {aside ? <Reveal delay={160}>{aside}</Reveal> : null}
    </div>
  );
}
