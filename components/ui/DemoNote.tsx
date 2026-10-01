import { brand } from "@/config/brand";
import { cn } from "@/lib/utils";

export function DemoNote({ className }: { className?: string }) {
  return (
    <p className={cn("num text-[10px] tracking-[0.18em] uppercase text-silver", className)}>
      {brand.disclaimers.demo}
    </p>
  );
}
