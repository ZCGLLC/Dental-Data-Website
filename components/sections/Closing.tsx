import { closing } from "@/data/content";
import { brand } from "@/config/brand";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Closing() {
  return (
    <section className="bg-ink py-32 md:py-44">
      <div className="shell">
        <h2 className="display max-w-5xl text-[clamp(3rem,8vw,7.2rem)] uppercase">
          {closing.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <div className="mt-12">
          <MagneticButton href="/#contact">{brand.cta.join}</MagneticButton>
        </div>
      </div>
    </section>
  );
}
