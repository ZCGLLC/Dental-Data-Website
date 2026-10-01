import { science } from "@/data/content";
import { brand } from "@/config/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Science({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="science" className="bg-[#f7f5f1] py-28 md:py-40">
      <div className="shell">
        <Reveal>
          <SectionHeading
            as={heading}
            eyebrow={science.eyebrow}
            title={[...science.title]}
            lede={science.lede}
          />
        </Reveal>
        <div className="mt-16 divide-y divide-black/10 border-y border-black/10">
          {science.topics.map((topic, index) => (
            <article key={topic.title} className="grid gap-4 py-8 md:grid-cols-[220px_1fr] md:gap-12">
              <p className="num text-[11px] tracking-[0.18em] text-ice">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="text-2xl">{topic.title}</h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-titanium">{topic.body}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-sm leading-7 text-silver">{brand.disclaimers.science}</p>
      </div>
    </section>
  );
}
