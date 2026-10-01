import { partnerships } from "@/data/content";
import { brand } from "@/config/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Partnerships({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="partners" className="bg-[#0b0c0e] py-28 md:py-40">
      <div className="shell">
        <Reveal>
          <SectionHeading
            as={heading}
            eyebrow={partnerships.eyebrow}
            title={[...partnerships.title]}
            lede={partnerships.lede}
          />
          <p className="lede mt-6 max-w-2xl">{partnerships.body}</p>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {partnerships.connections.map((connection) => (
            <article key={connection.title} className="border border-white/10 p-6">
              <ConnectionArt title={connection.title} />
              <h3 className="mt-8 text-[13px] tracking-[0.16em] uppercase">{connection.title}</h3>
              <p className="mt-3 text-sm leading-6 text-titanium">{connection.text}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-xs tracking-[0.08em] text-silver uppercase">{partnerships.note}</p>
        <div className="mt-10">
          <MagneticButton href="/contact?role=Implant%20manufacturer" showArrow>
            {brand.cta.partnerships}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

function ConnectionArt({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 240 140" className="h-28 w-full" aria-hidden="true">
      <rect width="240" height="140" fill="#101114" />
      {title === "Internal hex" ? (
        <g fill="none" stroke="#c5c8ce" strokeWidth="1.2">
          <circle cx="120" cy="70" r="36" />
          <polygon points="120,48 138,58 138,82 120,92 102,82 102,58" />
        </g>
      ) : null}
      {title === "Conical" ? (
        <g fill="none" stroke="#c5c8ce" strokeWidth="1.2">
          <path d="M78 38h84l-16 64H94z" />
          <path d="M96 58h48" />
        </g>
      ) : null}
      {title === "External hex" ? (
        <g fill="none" stroke="#c5c8ce" strokeWidth="1.2">
          <circle cx="120" cy="78" r="28" />
          <polygon points="120,28 136,38 136,54 120,64 104,54 104,38" />
        </g>
      ) : null}
    </svg>
  );
}
