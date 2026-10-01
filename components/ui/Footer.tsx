import Link from "next/link";
import { brand } from "@/config/brand";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="shell flex flex-col gap-12 py-14">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-6 text-silver">{brand.tagline}</p>
          </div>
          <a
            href={`mailto:${brand.email}`}
            className="text-sm tracking-[0.08em] text-porcelain"
          >
            {brand.email}
          </a>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
          {brand.footer.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12px] tracking-[0.16em] text-titanium uppercase hover:text-porcelain"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {brand.social.length > 0 ? (
          <div className="flex gap-4">
            {brand.social.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-titanium hover:text-porcelain"
              >
                {item.label}
              </a>
            ))}
          </div>
        ) : null}
        <div className="max-w-2xl space-y-2 text-xs leading-5 text-silver">
          <p>{brand.disclaimers.research}</p>
          <p>{brand.disclaimers.footer}</p>
        </div>
        <p className="text-[11px] tracking-[0.16em] text-silver/80 uppercase">
          © {new Date().getFullYear()} {brand.name}
        </p>
      </div>
    </footer>
  );
}
