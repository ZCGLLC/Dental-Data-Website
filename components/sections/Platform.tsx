import { platform } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Platform({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="platform" className="border-t border-black/10 bg-ink py-28 md:py-40">
      <div className="shell">
        <Reveal>
          <SectionHeading
            as={heading}
            eyebrow={platform.eyebrow}
            title={[...platform.title]}
            lede={platform.lede}
          />
        </Reveal>
        <div className="mt-16 grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <ol className="relative space-y-0">
            <span className="absolute top-2 bottom-2 left-[7px] w-px bg-black/10" aria-hidden="true" />
            {platform.flow.map((step, index) => (
              <li key={step.title} className="relative pb-10 pl-10">
                <span className="absolute top-1.5 left-0 h-4 w-4 rounded-full border border-ice bg-ink" />
                <p className="num text-[10px] tracking-[0.18em] text-ice">0{index + 1}</p>
                <h3 className="mt-2 text-xl">{step.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-titanium">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="grid gap-px bg-black/8 sm:grid-cols-2">
            {platform.products.map((product) => (
              <article key={product.title} className="bg-ink p-6">
                <h3 className="text-[13px] tracking-[0.16em] uppercase">{product.title}</h3>
                <p className="mt-4 text-sm leading-6 text-titanium">{product.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
