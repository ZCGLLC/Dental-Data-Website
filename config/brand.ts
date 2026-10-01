export const brand = {
  name: "Enamel Intelligence",
  shortName: "EI",
  tagline: "The future of connected dental implants.",
  description:
    "Developing sensor-enabled dental implant technology designed to bring sensing, connectivity and longitudinal data to implant dentistry.",
  email: "hello@enamelintelligence.com",
  siteUrl: "https://enamelintelligence.com",
  social: [] as { label: string; href: string }[],
  cta: {
    join: "Join the Future",
    explore: "Explore the Technology",
    partner: "Partner With Us",
    research: "Research With Us",
    investors: "Investor Inquiries",
    conversation: "Start a Conversation",
    partnerships: "Explore Partnerships",
  },
  nav: [
    { label: "Technology", href: "/#technology" },
    { label: "Platform", href: "/#platform" },
    { label: "Science", href: "/#science" },
    { label: "For Clinicians", href: "/#clinicians" },
    { label: "For Partners", href: "/#partners" },
    { label: "Company", href: "/#company" },
    { label: "Investors", href: "/#investors" },
  ],
  footer: [
    { label: "Technology", href: "/technology" },
    { label: "Science", href: "/science" },
    { label: "Company", href: "/company" },
    { label: "Research", href: "/research" },
    { label: "Investors", href: "/investors" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  assets: {
    /**
     * Set to true after placing a GLB at `implantModelPath`.
     * Name the meshes Crown, SensorLayer, SmartAbutment, ImplantFixture, and Bone
     * so the assembly animation can address them.
     */
    useExternalImplantModel: false,
    implantModelPath: "/models/smart-implant.glb",
  },
  disclaimers: {
    research: "Research-stage dental technology.",
    footer:
      "Technology shown may represent concepts and development objectives rather than commercially available products.",
    science:
      "This website describes technology concepts currently under research and development. Nothing presented constitutes medical advice or represents an FDA-cleared diagnostic device unless explicitly stated otherwise.",
    demo: "Simulated demonstration data. Not a clinical measurement.",
    dashboard: "Demonstration interface. Not for clinical use.",
    biology:
      "Long-term research. These capabilities would require extensive scientific validation and regulatory development.",
  },
} as const;

export type BrandNavItem = (typeof brand.nav)[number];
