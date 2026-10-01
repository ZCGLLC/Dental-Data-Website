import { clinicians } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Clinicians({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="clinicians" className="border-t border-black/10 bg-ink py-28 md:py-40">
      <div className="shell">
        <Reveal>
          <SectionHeading
            as={heading}
            eyebrow={clinicians.eyebrow}
            title={[...clinicians.title]}
            lede={clinicians.lede}
          />
          <p className="mt-6 max-w-xl text-sm leading-7 text-silver">
            The items below are intended capabilities and development goals. They are not proven
            clinical benefits.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-px bg-black/8 md:grid-cols-2 lg:grid-cols-3">
          {clinicians.goals.map((goal, index) => (
            <article key={goal.title} className="bg-ink p-7">
              <p className="num text-[10px] tracking-[0.18em] text-ice">0{index + 1}</p>
              <h3 className="mt-4 text-2xl">{goal.title}</h3>
              <p className="mt-4 text-sm leading-6 text-titanium">{goal.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-16 max-w-3xl">
          <h3 className="text-[12px] tracking-[0.18em] text-ice uppercase">
            {clinicians.scenarioTitle}
          </h3>
          <ol className="mt-6 space-y-5">
            {clinicians.scenario.map((step, index) => (
              <li key={step} className="grid grid-cols-[auto_1fr] gap-4 text-sm leading-7 text-titanium">
                <span className="num text-ice">0{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
