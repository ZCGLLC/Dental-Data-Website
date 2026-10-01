import { company } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Company({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="company" className="border-t border-black/10 bg-ink py-28 md:py-40">
      <div className="shell grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <SectionHeading as={heading} eyebrow={company.eyebrow} title={[...company.title]} />
          <div className="mt-10 max-w-xl space-y-5 text-base leading-7 text-titanium">
            {company.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
        <div className="space-y-8">
          {company.principles.map((principle) => (
            <article key={principle.title} className="border-t border-black/10 pt-5">
              <h3 className="text-xl">{principle.title}</h3>
              <p className="mt-3 text-sm leading-6 text-titanium">{principle.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
