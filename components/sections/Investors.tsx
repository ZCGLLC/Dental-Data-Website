import { investors } from "@/data/content";
import { brand } from "@/config/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Investors({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="investors" className="border-t border-white/10 bg-ink py-28 md:py-40">
      <div className="shell">
        <Reveal>
          <SectionHeading
            as={heading}
            eyebrow={investors.eyebrow}
            title={[...investors.title]}
            lede={investors.lede}
          />
        </Reveal>
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[12px] tracking-[0.18em] text-silver uppercase">A platform could span</p>
            <ul className="mt-6 grid grid-cols-2 gap-4">
              {investors.spans.map((item) => (
                <li key={item} className="border-t border-white/15 pt-3 text-lg">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-lg text-sm leading-7 text-silver">{investors.note}</p>
          </div>
          <div className="border border-white/10 p-7">
            <p className="num text-[10px] tracking-[0.18em] text-ice uppercase">
              {investors.stageLabel}
            </p>
            <p className="display mt-3 text-4xl uppercase">{investors.stage}</p>
            <p className="num mt-10 text-[10px] tracking-[0.18em] text-ice uppercase">
              {investors.focusLabel}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-titanium">
              {investors.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-10">
              <MagneticButton href="/contact?role=Investor" showArrow>
                {brand.cta.investors}
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
