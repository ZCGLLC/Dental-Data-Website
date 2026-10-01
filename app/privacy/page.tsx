import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { pageMeta } from "@/data/content";

export const metadata: Metadata = pageMeta.privacy;

export default function PrivacyPage() {
  return (
    <main id="main" className="pt-32 pb-24">
      <article className="shell max-w-3xl">
        <p className="eyebrow">Privacy</p>
        <h1 className="display mt-5 text-5xl uppercase md:text-7xl">Privacy</h1>
        <p className="mt-4 text-sm text-silver">1 October 2026</p>
        <div className="mt-10 space-y-6 text-sm leading-7 text-titanium">
          <p>
            {brand.name} publishes this website to describe research-stage technology. This notice
            explains how the site itself treats information.
          </p>
          <h2 className="pt-4 text-xl text-porcelain">What the site collects</h2>
          <p>
            The contact form does not store your message on our servers. Choosing “Start a
            Conversation” opens your email application with a note addressed to {brand.email}. What
            happens next is between you and your email provider.
          </p>
          <p>
            The site does not ask you to create an account. It does not include analytics pixels,
            advertising trackers, or a patient portal.
          </p>
          <h2 className="pt-4 text-xl text-porcelain">Demonstration data</h2>
          <p>
            Numbers, charts, night studies, and implant records shown in the interface are
            simulated. They are not measurements from a person, a clinic, or a device in use.
          </p>
          <h2 className="pt-4 text-xl text-porcelain">Emails you send us</h2>
          <p>
            If you email {brand.email}, we use that message to respond and to understand the kind
            of collaboration you are proposing. We do not sell personal information.
          </p>
          <h2 className="pt-4 text-xl text-porcelain">Contact</h2>
          <p>
            Questions about this notice can be sent to{" "}
            <a className="text-porcelain" href={`mailto:${brand.email}`}>
              {brand.email}
            </a>
            .
          </p>
        </div>
      </article>
    </main>
  );
}
