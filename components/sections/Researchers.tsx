import { researchers } from "@/data/content";
import { brand } from "@/config/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Researchers({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="research" className="bg-[#090a0c] py-28 md:py-40">
      <div className="shell grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionHeading
            as={heading}
            eyebrow={researchers.eyebrow}
            title={[...researchers.title]}
            lede={researchers.lede}
          />
          <ul className="mt-10 space-y-3">
            {researchers.audiences.map((audience) => (
              <li key={audience} className="border-b border-white/10 pb-3 text-lg">
                {audience}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <MagneticButton href="/contact?role=Researcher" showArrow>
              {brand.cta.research}
            </MagneticButton>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {researchers.threads.map((thread) => (
            <article key={thread.title} className="border border-white/10 p-6">
              <h3 className="text-xl">{thread.title}</h3>
              <p className="mt-4 text-sm leading-6 text-titanium">{thread.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
