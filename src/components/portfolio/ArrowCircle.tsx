import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function ArrowCircle({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-45",
        className,
      )}
    >
      <ArrowUpRight className="size-4" />
    </span>
  );
}
