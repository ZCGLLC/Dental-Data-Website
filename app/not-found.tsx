import { MagneticButton } from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <main id="main" className="shell flex min-h-[80svh] flex-col justify-end py-24">
      <p className="eyebrow">404</p>
      <h1 className="display mt-5 max-w-3xl text-6xl uppercase md:text-8xl">
        This page is not on the map.
      </h1>
      <div className="mt-10">
        <MagneticButton href="/">Return home</MagneticButton>
      </div>
    </main>
  );
}
