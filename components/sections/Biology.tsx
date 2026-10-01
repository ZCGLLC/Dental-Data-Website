import { biology } from "@/data/content";
import { brand } from "@/config/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Biology() {
  return (
    <section id="biology" className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at 70% 40%, rgba(142,197,212,0.16), transparent 28%), radial-gradient(circle at 30% 70%, rgba(215,228,238,0.08), transparent 26%)",
        }}
      />
      <div className="shell relative grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">{biology.eyebrow}</p>
          <SectionHeading title={[...biology.title]} lede={biology.lede} className="mt-5" />
          <p className="mt-8 max-w-xl text-sm leading-7 text-silver">{brand.disclaimers.biology}</p>
        </Reveal>
        <Reveal>
          <div className="relative border border-white/10 bg-[#0b0e11]/80 p-8">
            <svg viewBox="0 0 360 280" className="mb-8 h-40 w-full" aria-hidden="true">
              <g fill="none" stroke="#8ec5d4" strokeOpacity="0.7">
                <ellipse cx="180" cy="140" rx="70" ry="28" />
                <ellipse cx="180" cy="140" rx="108" ry="48" strokeOpacity="0.35" />
                <ellipse cx="180" cy="140" rx="140" ry="70" strokeOpacity="0.2" />
              </g>
              <path
                d="M166 86c16 0 28 10 32 24 2 8-2 16-8 20h-48c-6-4-10-12-8-20 4-14 16-24 32-24z"
                fill="#f4f0e8"
                opacity="0.85"
              />
              {Array.from({ length: 18 }).map((_, index) => (
                <circle
                  key={index}
                  cx={40 + ((index * 47) % 300)}
                  cy={30 + ((index * 29) % 220)}
                  r={index % 3 === 0 ? 2.2 : 1.2}
                  fill="#d7e4ee"
                  opacity={0.35 + (index % 4) * 0.1}
                />
              ))}
            </svg>
            <ul className="space-y-4">
              {biology.areas.map((area, index) => (
                <li key={area} className="flex items-baseline justify-between gap-6 border-b border-white/10 pb-3">
                  <span className="num text-[10px] tracking-[0.18em] text-ice">
                    0{index + 1}
                  </span>
                  <span className="flex-1 text-lg">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
