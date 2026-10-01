import type { Metadata } from "next";
import { pageMeta } from "@/data/content";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = pageMeta.contact;

export default function ContactPage() {
  return (
    <main id="main" className="pt-24">
      <Contact heading="h1" />
    </main>
  );
}
