"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  showArrow?: boolean;
};

export function MagneticButton({
  href,
  children,
  variant = "solid",
  className,
  onClick,
  showArrow = false,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = usePrefersReducedMotion();

  function onMove(event: React.MouseEvent<HTMLAnchorElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate(${x * 0.22}px, ${y * 0.28}px)`;
  }

  function onLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  }

  return (
    <Link
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[13px] tracking-[0.08em] transition-[background-color,border-color,transform] duration-300",
        variant === "solid"
          ? "bg-porcelain text-ink hover:bg-ceramic"
          : "border border-white/20 bg-transparent text-porcelain hover:border-white/50",
        className,
      )}
    >
      {children}
      {showArrow ? <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} /> : null}
    </Link>
  );
}
