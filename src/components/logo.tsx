import { Sparkle } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground shadow-[var(--shadow-glow)] brand-gradient">
        <Sparkle className="h-4.5 w-4.5" fill="currentColor" />
      </span>
      {!compact && (
        <span className="text-[17px] font-bold tracking-tight">
          Split<span className="gradient-text">Smart</span>
        </span>
      )}
    </span>
  );
}
