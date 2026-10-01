"use client";

import { useState } from "react";

export function TrendChart({
  series,
  label,
}: {
  series: readonly number[];
  label: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const width = 640;
  const height = 180;
  const pad = 12;
  const min = Math.min(...series) - 8;
  const max = Math.max(...series) + 8;
  const step = (width - pad * 2) / (series.length - 1);
  const points = series.map((value, index) => {
    const x = pad + index * step;
    const y = pad + ((max - value) / (max - min)) * (height - pad * 2);
    return { x, y, value };
  });
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `${pad},${height - pad} ${line} ${width - pad},${height - pad}`;
  const active = hover === null ? points[points.length - 1] : points[hover];

  return (
    <div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label={label}
        onMouseLeave={() => setHover(null)}
      >
        <polygon points={area} fill="#8ec5d4" opacity="0.12" />
        <polyline points={line} fill="none" stroke="#8ec5d4" strokeWidth="1.6" />
        {points.map((point, index) => (
          <rect
            key={index}
            x={point.x - step / 2}
            y={0}
            width={step}
            height={height}
            fill="transparent"
            onMouseEnter={() => setHover(index)}
          />
        ))}
        {active ? <circle cx={active.x} cy={active.y} r="3.5" fill="#f3f0ea" /> : null}
      </svg>
      <p className="num mt-2 text-xs text-silver">
        {active ? `${active.value} N` : ""} · simulated
      </p>
    </div>
  );
}
