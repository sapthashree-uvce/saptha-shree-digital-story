import {
  siC,
  siCplusplus,
  siGit,
  siGithub,
  siJupyter,
  siNumpy,
  siPandas,
  siPycharm,
  siPython,
  siScikitlearn,
  siUbuntu,
} from "simple-icons";
import { ChartColumn, Code, FileText, Palette, Presentation, Sheet, Terminal, Waves } from "lucide-react";

import type { SkillIcon } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const BRANDS: Record<string, { path: string; title: string }> = {
  python: siPython,
  cplusplus: siCplusplus,
  c: siC,
  numpy: siNumpy,
  pandas: siPandas,
  scikitlearn: siScikitlearn,
  git: siGit,
  github: siGithub,
  jupyter: siJupyter,
  pycharm: siPycharm,
  ubuntu: siUbuntu,
};

const LUCIDE = {
  chart: ChartColumn,
  waves: Waves,
  code: Code,
  terminal: Terminal,
  palette: Palette,
  file: FileText,
  sheet: Sheet,
  presentation: Presentation,
} as const;

export function BrandIcon({ icon, className }: { icon: SkillIcon; className?: string }) {
  if (icon.kind === "brand") {
    const brand = BRANDS[icon.slug];
    if (!brand) return null;
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-5 fill-current", className)}>
        <path d={brand.path} />
      </svg>
    );
  }
  const Icon = LUCIDE[icon.name as keyof typeof LUCIDE] ?? Code;
  return <Icon aria-hidden="true" className={cn("size-5", className)} strokeWidth={1.75} />;
}

export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-4 fill-current", className)}>
      <path d={siGithub.path} />
    </svg>
  );
}

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-4 fill-current", className)}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
