import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";

const tones = {
  primary: "text-primary bg-primary/10",
  blue: "text-brand-blue bg-brand-blue/10",
  purple: "text-brand-purple bg-brand-purple/10",
  amber: "text-warning bg-warning/10",
} as const;

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "primary",
  className,
}: {
  label: string;
  value: string;
  delta?: { value: string; up: boolean };
  icon: LucideIcon;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <div className={cn("glass lift rounded-2xl p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", tones[tone])}>
          <Icon className="h-[18px] w-[18px]" />
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight sm:text-[28px]">{value}</p>
      {delta ? (
        <p
          className={cn(
            "mt-2 flex items-center gap-1 text-xs font-medium",
            delta.up ? "text-primary" : "text-destructive",
          )}
        >
          {delta.up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
          {delta.value}
          <span className="text-muted-foreground">vs last month</span>
        </p>
      ) : null}
    </div>
  );
}
