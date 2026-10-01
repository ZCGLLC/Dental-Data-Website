"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { brand } from "@/config/brand";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function onNavClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const hash = href.split("#")[1];
    if (!hash || pathname !== "/") return;
    const target = document.getElementById(hash);
    if (!target) return;
    event.preventDefault();
    setOpenPath(null);
    if (lenis) lenis.scrollTo(target, { offset: 0 });
    else target.scrollIntoView();
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-porcelain focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed z-50 transition-all duration-500",
          scrolled || open
            ? "top-3 right-3 left-3 md:right-5 md:left-5"
            : "top-0 right-0 left-0",
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-14 items-center justify-between gap-4 px-4 transition-all duration-500 md:h-16 md:px-6",
            scrolled || open
              ? "rounded-full border border-white/10 bg-[#0c0d10]/75 backdrop-blur-md md:px-5"
              : "border border-transparent bg-transparent",
          )}
        >
          <Link href="/" aria-label={`${brand.name} home`} className="shrink-0">
            <Logo withName />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-5 xl:flex">
            {brand.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(event) => onNavClick(event, item.href)}
                className="text-[12px] tracking-[0.12em] text-titanium uppercase transition-colors hover:text-porcelain"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              onClick={(event) => onNavClick(event, "/#contact")}
              className="hidden h-10 items-center rounded-full bg-porcelain px-4 text-[12px] tracking-[0.12em] text-ink uppercase sm:inline-flex"
            >
              {brand.cta.join}
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-porcelain xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpenPath(open ? null : pathname)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {open ? <X strokeWidth={1.25} /> : <Menu strokeWidth={1.25} />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-40 bg-ink/95 px-6 pt-28 backdrop-blur-xl xl:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-5">
            {brand.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(event) => onNavClick(event, item.href)}
                className="display text-4xl uppercase"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={(event) => onNavClick(event, "/#contact")}
              className="mt-4 inline-flex h-12 w-fit items-center rounded-full bg-porcelain px-6 text-sm tracking-[0.12em] text-ink uppercase"
            >
              {brand.cta.join}
            </Link>
          </nav>
        </div>
      ) : null}
    </>
  );
}
