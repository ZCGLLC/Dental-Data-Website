import { brand } from "@/config/brand";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  withName = true,
}: {
  className?: string;
  withName?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3 text-porcelain", className)}>
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <circle
          cx="16"
          cy="16"
          r="14.25"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
        />
        <path
          d="M7.5 19.2c2.4-1.4 4.6-5.2 8.5-5.2s6.1 3.8 8.5 5.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
        />
        <path
          d="M10 14.4c1.7 2.5 3.4 3.8 6 3.8s4.3-1.3 6-3.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.65"
        />
        <circle cx="16" cy="16.2" r="1.15" fill="#1d6478" />
      </svg>
      {withName ? (
        <span className="text-[12px] font-medium tracking-[0.18em] uppercase">
          {brand.shortName}
          <span className="sr-only"> {brand.name}</span>
        </span>
      ) : null}
    </span>
  );
}
