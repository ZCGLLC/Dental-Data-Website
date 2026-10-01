import { parts } from "@/data/content";
import { cn } from "@/lib/utils";

export function ImplantSchematic({
  className,
  exploded = false,
  active,
}: {
  className?: string;
  exploded?: boolean;
  active?: string | null;
}) {
  const gap = exploded ? 18 : 0;

  return (
    <svg
      viewBox="0 0 280 520"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Side study of a ceramic crown, sensor layer, smart abutment, titanium implant, and bone."
    >
      <g fill="none" stroke="#1c2128" strokeWidth="1.1">
        <path
          d={`M140 ${78 - gap}c28 0 48 18 54 42 4 16-2 30-14 40-8 6-14 10-14 18h-52c0-8-6-12-14-18-12-10-18-24-14-40 6-24 26-42 54-42z`}
          fill="#efe8de"
          opacity="0.98"
        />
        <rect
          x="112"
          y={168 - gap * 0.35}
          width="56"
          height="16"
          rx="2"
          fill="#1a2228"
          stroke="#1d6478"
        />
        <path
          d={`M122 ${196 + gap * 0.15}h36l10 62-8 18h-40l-8-18z`}
          fill="#c5c8ce"
          stroke="#9aa1aa"
        />
        <path
          d={`M128 ${286 + gap * 0.45}h24v118l-6 16h-12l-6-16z`}
          fill="#b7bcc4"
          stroke="#8e949e"
        />
        {Array.from({ length: 7 }).map((_, index) => (
          <path
            key={index}
            d={`M118 ${304 + gap * 0.45 + index * 14}h44`}
            stroke="#6d737c"
            strokeWidth="2"
          />
        ))}
        <path
          d={`M70 ${430 + gap}c28-18 112-18 140 0 18 12 18 28 0 36-28 14-112 14-140 0-18-8-18-24 0-36z`}
          fill="#d5cdc4"
          stroke="#b7aea4"
          opacity="0.9"
        />
      </g>
      <g className="num" fill="#1d6478" fontSize="9" letterSpacing="1.5">
        {parts.map((part, index) => (
          <text
            key={part.id}
            x="18"
            y={120 + index * 58}
            opacity={!active || active === part.id ? 1 : 0.35}
          >
            {part.index} {part.name.toUpperCase()}
          </text>
        ))}
      </g>
    </svg>
  );
}
