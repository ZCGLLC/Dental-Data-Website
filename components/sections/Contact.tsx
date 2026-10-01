import { contact } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InquiryForm } from "@/components/contact/InquiryForm";

export function Contact({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="contact" className="border-t border-white/10 bg-[#090a0c] py-28 md:py-40">
      <div className="shell grid gap-14 lg:grid-cols-2">
        <SectionHeading
          as={heading}
          eyebrow={contact.eyebrow}
          title={[...contact.title]}
          lede={contact.lede}
        />
        <InquiryForm />
      </div>
    </section>
  );
}
