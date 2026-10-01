import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { pageMeta } from "@/data/content";

export const metadata: Metadata = pageMeta.terms;

export default function TermsPage() {
  return (
    <main id="main" className="pt-32 pb-24">
      <article className="shell max-w-3xl">
        <p className="eyebrow">Terms</p>
        <h1 className="display mt-5 text-5xl uppercase md:text-7xl">Terms</h1>
        <p className="mt-4 text-sm text-silver">1 October 2026</p>
        <div className="mt-10 space-y-6 text-sm leading-7 text-titanium">
          <p>
            This website is an informational presentation of technology concepts from {brand.name}.
            By using it, you agree to these terms.
          </p>
          <h2 className="pt-4 text-xl text-porcelain">Research-stage information</h2>
          <p>{brand.disclaimers.science}</p>
          <p>{brand.disclaimers.footer}</p>
          <h2 className="pt-4 text-xl text-porcelain">No medical relationship</h2>
          <p>
            Nothing on this site is medical advice, a diagnosis, or an invitation to use an
            unapproved device. The dashboard, sensor studies, and night visualizations are
            demonstrations with simulated numbers.
          </p>
          <h2 className="pt-4 text-xl text-porcelain">Intellectual property</h2>
          <p>
            The site design, copy, and original graphics are owned by {brand.name} unless stated
            otherwise. You may not copy them for a competing product presentation. You may link to
            public pages.
          </p>
          <h2 className="pt-4 text-xl text-porcelain">No warranty</h2>
          <p>
            The site is provided as a description of work in progress. We do not warrant that any
            concept shown will become a product, receive regulatory authorization, or perform as
            illustrated.
          </p>
          <h2 className="pt-4 text-xl text-porcelain">Contact</h2>
          <p>
            <a className="text-porcelain" href={`mailto:${brand.email}`}>
              {brand.email}
            </a>
          </p>
        </div>
      </article>
    </main>
  );
}
