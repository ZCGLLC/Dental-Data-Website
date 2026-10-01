import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  as = "h2",
  className,
}: {
  eyebrow?: string;
  title: string[];
  lede?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  const Heading = as;

  return (
    <header className={cn("max-w-4xl", className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Heading className="display mt-5 text-[clamp(2.7rem,6.4vw,5.8rem)] uppercase">
        {title.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </Heading>
      {lede ? <p className="lede mt-8 max-w-xl">{lede}</p> : null}
    </header>
  );
}
