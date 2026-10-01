import { demo } from "@/data/demo";

export const hero = {
  title: ["The tooth", "is becoming", "intelligent."],
  lede: "We’re developing a sensor-enabled dental implant platform designed to give clinicians new visibility into the forces and conditions surrounding implant restorations.",
};

export const parts = [
  {
    id: "crown",
    index: "01",
    name: "Crown",
    line: "Precision restoration.",
    detail:
      "A ceramic restoration conceived as the visible surface of the system. In the architecture under development, the crown completes the assembly above the sensing layer.",
  },
  {
    id: "sensor",
    index: "02",
    name: "Sensor layer",
    line: "Miniaturized sensing and communication.",
    detail:
      "A compact region being designed for MEMS-class sensing, temperature measurement, and short-range wireless concepts such as NFC or RFID.",
  },
  {
    id: "abutment",
    index: "03",
    name: "Smart abutment",
    line: "Where intelligence meets implant mechanics.",
    detail:
      "The abutment is the primary home for the electronics under exploration, so a future service event could address the restoration without removing an osseointegrated fixture.",
  },
  {
    id: "implant",
    index: "04",
    name: "Implant",
    line: "Proven foundation.",
    detail:
      "The fixture itself is intended to remain a conventional titanium implant. Sensing is being developed above it, not instead of established implant mechanics.",
  },
  {
    id: "bone",
    index: "05",
    name: "Bone",
    line: "The living interface.",
    detail:
      "Load eventually meets bone. The research interest is better visibility into the mechanical conditions around that interface over time.",
  },
] as const;

export type PartId = (typeof parts)[number]["id"];

export const problem = {
  eyebrow: "The clinical silence",
  title: ["Dental implants are advanced.", "They’re still mostly silent."],
  paragraphs: [
    "Modern dental implants restore millions of smiles, but once placed, clinicians often rely on periodic examinations, imaging, patient symptoms, and indirect measurements to understand how an implant is performing.",
    "We believe implant restorations can become a source of data.",
  ],
};

export const sensors = {
  eyebrow: "Sensing studies",
  title: ["Signals from", "the restoration."],
  lede: "An interactive study of measurements the platform is being developed to explore. Every figure on this screen is simulated.",
  metrics: [
    {
      id: "bite",
      label: "Bite force",
      summary:
        "Pressure visualized traveling through the crown. The platform is being developed to measure occlusal load at the restoration.",
      stats: [
        { label: "Peak load", value: demo.peakLoad },
        { label: "Current", value: demo.currentLoad },
        { label: "Baseline", value: demo.baseline },
        { label: "Change", value: demo.change },
      ],
    },
    {
      id: "strain",
      label: "Strain",
      summary:
        "Mechanical strain mapped across the abutment. Miniaturized strain sensing is an active engineering subject, shown here as a demonstration field.",
      stats: [
        { label: "Peak strain", value: "842 µε" },
        { label: "Current", value: "806 µε" },
        { label: "Baseline", value: "690 µε" },
        { label: "Site", value: "Abutment" },
      ],
    },
    {
      id: "temperature",
      label: "Temperature",
      summary:
        "A thermal reading associated with the restoration environment. Temperature is being explored as a companion signal to mechanical load.",
      stats: [
        { label: "Current", value: demo.temperature },
        { label: "Baseline", value: "36.4°C" },
        { label: "Delta", value: "+0.3°C" },
        { label: "Window", value: "15 min" },
      ],
    },
    {
      id: "load",
      label: "Load distribution",
      summary:
        "A conceptual map of how contact force might spread across the occlusal surface. Distribution models are illustrative.",
      stats: [
        { label: "Mesial", value: "28%" },
        { label: "Distal", value: "31%" },
        { label: "Buccal", value: "22%" },
        { label: "Lingual", value: "19%" },
      ],
    },
    {
      id: "bruxism",
      label: "Bruxism events",
      summary:
        "Repeated loading events used to illustrate how clenching patterns might appear between visits. Not a diagnosis of bruxism.",
      stats: [
        { label: "Events", value: "14" },
        { label: "Window", value: "Night" },
        { label: "Peak", value: "228 N" },
        { label: "Quiet hours", value: "4.2 h" },
      ],
    },
    {
      id: "identity",
      label: "Implant identity",
      summary:
        "A future record could travel with the restoration: what was placed, where, and how it has been read since.",
      stats: [
        { label: "Record", value: demo.identity.record },
        { label: "Site", value: demo.identity.site },
        { label: "Platform", value: demo.identity.platform },
        { label: "Restoration", value: "Zirconia" },
      ],
    },
  ],
} as const;

export type SensorId = (typeof sensors.metrics)[number]["id"];

export const twin = {
  eyebrow: "Longitudinal record",
  title: ["Every implant.", "A digital twin."],
  lede: "Future iterations of the platform could create longitudinal digital records connected to each implant — a history that begins at placement and grows with every read.",
  fields: [
    "Manufacturer",
    "Implant type",
    "Dimensions",
    "Placement date",
    "Restoration",
    "Clinical maintenance",
    "Load history",
    "Sensor history",
  ],
  note: "The twin shown here is a design study. It is not connected to a patient, a clinic, or a manufactured device.",
};

export const dashboardCopy = {
  eyebrow: "Clinical software concept",
  title: ["A quieter view", "of the same tooth."],
  lede: "Interface studies for a future clinician workspace. The layout is a product concept for reviewing restoration-level measurements alongside the chart.",
};

export const bruxism = {
  eyebrow: "Between visits",
  title: ["What happens", "when the patient", "leaves the chair?"],
  lede: "Future sensor architectures may enable implant systems to capture patterns of mechanical loading between clinical visits.",
  note: "The night study below uses simulated pressure events. It does not detect, diagnose, or grade bruxism.",
};

export const biology = {
  eyebrow: "Long-term research",
  title: ["Mechanics are only", "the beginning."],
  lede: "Mechanical signals are the first development focus. A later research horizon asks whether the peri-implant environment itself could be observed.",
  areas: [
    "pH",
    "Temperature",
    "Inflammatory biomarkers",
    "Bacterial metabolites",
    "Peri-implant environment",
  ],
};

export const roadmap = {
  eyebrow: "Development arc",
  title: ["A platform built", "in sequence."],
  lede: "Each phase is a development objective. Later phases depend on science, engineering, and regulatory work that has not been completed.",
  phases: [
    {
      index: "01",
      title: "Mechanics",
      items: ["Force", "Strain", "Temperature"],
    },
    {
      index: "02",
      title: "Connected implants",
      items: [
        "Wireless communication",
        "Longitudinal monitoring",
        "Digital implant identity",
      ],
    },
    {
      index: "03",
      title: "Intelligent analytics",
      items: [
        "Pattern detection",
        "Mechanical risk indicators",
        "Population insights",
      ],
    },
    {
      index: "04",
      title: "Biological sensing",
      items: ["Advanced biomarker research"],
    },
    {
      index: "05",
      title: "Connected oral health",
      items: ["A broader sensing platform for dentistry"],
    },
  ],
};

export const platform = {
  eyebrow: "Ecosystem",
  title: ["From the abutment", "to the record."],
  lede: "The concept is a path for data: a restoration that can be read, a clinical reader, a cloud record, and software a dentist could actually use.",
  flow: [
    {
      title: "Smart abutment",
      text: "Sensing and identity concepts housed in the restoration, above a conventional fixture.",
    },
    {
      title: "Clinical reader",
      text: "A chairside instrument concept for waking, reading, or commissioning the restoration.",
    },
    {
      title: "Cloud platform",
      text: "A future home for longitudinal implant records, governed for clinical use.",
    },
    {
      title: "Dentist dashboard",
      text: "Software studies for reviewing load, temperature, and history in a visit.",
    },
    {
      title: "Longitudinal data",
      text: "A record that could follow the implant across maintenance, repairs, and time.",
    },
  ],
  products: [
    {
      title: "Smart abutment",
      text: "The core hardware program. Sensor module, abutment mechanics, and a serviceable stack above the fixture.",
    },
    {
      title: "Clinical reader",
      text: "A readout concept for the operatory, aligned with short-range wireless architectures under study.",
    },
    {
      title: "Clinical software",
      text: "Dashboards and timelines intended to sit beside the way dentistry is already practiced.",
    },
    {
      title: "Data platform",
      text: "Infrastructure concepts for storing implant identity and measurement history.",
    },
    {
      title: "Developer / manufacturer API",
      text: "A future interface so implant partners could connect systems without rebuilding their fixture.",
    },
  ],
};

export const partnerships = {
  eyebrow: "Manufacturer collaboration",
  title: ["We don’t need to reinvent", "the entire implant."],
  lede: "Our long-term vision is to develop sensing technology that can integrate with established implant ecosystems.",
  body: "The fixture can stay familiar. The work is in the abutment and crown stack: geometry, connection, encapsulation, and a read path that respects how implants are already restored.",
  connections: [
    {
      title: "Internal hex",
      text: "A common indexed connection. Studied here only as a generic mechanical interface.",
    },
    {
      title: "Conical",
      text: "A tapered contact used across many systems. Integration work would be partner-specific.",
    },
    {
      title: "External hex",
      text: "An earlier indexed form that still appears in installed bases and product lines.",
    },
  ],
  note: "Generic geometries for integration studies. Not affiliated with any implant manufacturer.",
};

export const clinicians = {
  eyebrow: "For clinicians",
  title: ["More information.", "Without changing", "the art of dentistry."],
  lede: "The aim is a restoration that still looks, fits, and functions as a restoration — with a data layer available when a clinician wants it.",
  goals: [
    {
      title: "Understand implant loading",
      text: "Intended to offer a direct mechanical view of how a restoration is being used.",
    },
    {
      title: "Establish patient baselines",
      text: "A development goal is to capture an early reference, so later reads have something to stand beside.",
    },
    {
      title: "Track changes over time",
      text: "Longitudinal comparison is the point of a connected restoration. Clinical meaning would still need to be established.",
    },
    {
      title: "Monitor restoration mechanics",
      text: "Force, strain, and temperature are the measurement families under development.",
    },
    {
      title: "Maintain digital implant records",
      text: "Identity, components, and maintenance could live with the device rather than only in a chart.",
    },
    {
      title: "Access longitudinal measurements",
      text: "Future software is being designed so a visit can include history, not only the day itself.",
    },
  ],
  scenarioTitle: "A visit, as we imagine it",
  scenario: [
    "The restoration is placed on a conventional fixture. The smart components live in the abutment and crown.",
    "At a later visit, a reader concept retrieves identity and whatever measurement history the device has stored.",
    "The clinician sees the chart they already trust, with an added mechanical record clearly marked as measurement — not a diagnosis.",
    "If the restoration needs service, the concept is to address the connected components without removing an integrated implant.",
  ],
};

export const researchers = {
  eyebrow: "For researchers",
  title: ["The questions are", "still open."],
  lede: "We are looking for laboratories and clinical scientists who want to pressure-test the measurement problem with us.",
  audiences: [
    "Dental schools",
    "Universities",
    "Biomechanics laboratories",
    "Oral-health researchers",
    "Implant researchers",
  ],
  threads: [
    {
      title: "Benchtop loading",
      text: "Protocols that relate known forces to what a miniaturized sensor can actually report.",
    },
    {
      title: "Calibration and drift",
      text: "How a signal holds up in a wet, thermal, cyclic environment.",
    },
    {
      title: "Wireless readout",
      text: "Short-range power and data paths sized for an abutment, not a handset.",
    },
    {
      title: "Study design",
      text: "What a responsible clinical research program would need before any claim of usefulness.",
    },
  ],
};

export const investors = {
  eyebrow: "For investors",
  title: ["Building the data layer", "for dental implants."],
  lede: "Traditional implants restore function. Connected implants could generate information. That is the company thesis.",
  spans: [
    "Hardware",
    "Clinical software",
    "Implant analytics",
    "Dental data",
    "Manufacturer integration",
    "Research",
  ],
  stageLabel: "Current stage",
  stage: "Research & development",
  focusLabel: "Current focus",
  focus: [
    "Smart abutment architecture",
    "Bench prototype development",
    "Sensor validation",
    "Wireless architecture",
    "IP development",
    "Clinical partnerships",
  ],
  note: "We are early. This page does not report revenue, regulatory clearances, clinical results, or commercial partnerships.",
};

export const science = {
  eyebrow: "Science",
  title: ["The work underneath", "the render."],
  lede: "A plain account of the disciplines this company is working in. These are research subjects, not completed clinical evidence.",
  topics: [
    {
      title: "Dental implant biomechanics",
      body: "An implant transfers occlusal force into bone through the fixture and abutment. Magnitude, direction, and frequency shape the mechanical environment of the restoration. We are developing ways to observe parts of that environment from inside the prosthetic stack.",
    },
    {
      title: "Occlusal loading",
      body: "Bite force changes with the person, the food, the restoration, and parafunction. Clinics usually infer it from examination, wear, symptoms, and imaging. In-restoration force measurement is the first sensing problem we are organized around.",
    },
    {
      title: "Strain sensing",
      body: "Strain is deformation under load. Engineering already measures it with gauges and MEMS devices. Placing that kind of measurement in an abutment introduces questions of range, calibration, drift, and packaging that are still in development.",
    },
    {
      title: "MEMS sensors",
      body: "Microelectromechanical sensors can report force, pressure, and temperature at a small scale. The program is exploring which MEMS-class approaches can physically fit a dental restoration and survive it.",
    },
    {
      title: "Wireless power",
      body: "A restoration has little room for a battery. Passive and ultra-low-power approaches — including short-range inductive coupling — are being studied so a device might be read in the chair without a bulky power source.",
    },
    {
      title: "RFID / NFC",
      body: "Near-field radio is a candidate for identity and small data exchange. We are evaluating it as a clinic-side read path, not as a consumer feature and not as a continuous wide-area connection.",
    },
    {
      title: "Miniaturized electronics",
      body: "Microcontroller or ASIC concepts, a miniature antenna, and the interconnect between them have to live in the crown and abutment volume. The fixture is deliberately left electrically quiet.",
    },
    {
      title: "Biocompatible encapsulation",
      body: "Anything electronic in the mouth needs a barrier against fluid, load, and time. Encapsulation materials and joint design are development topics. We do not claim a finished biological seal.",
    },
    {
      title: "Signal processing",
      body: "A raw transducer output is not a clinical statement. Filtering, calibration, and context would have to sit between the sensor and any future interface. The graphs on this site are scripted demonstrations of that interface, not processed patient signals.",
    },
    {
      title: "Long-term monitoring",
      body: "The reason to connect an implant is time. A record of mechanical conditions between visits is the behavior we want to make possible. What those records should mean clinically is a question for research and, where required, regulators.",
    },
  ],
};

export const company = {
  eyebrow: "Company",
  title: ["Why should a dental implant", "stop evolving after it’s placed?"],
  paragraphs: [
    "The dental implant transformed restorative dentistry. But the implant itself has remained largely passive.",
    "We believe the next generation of implant dentistry will combine exceptional biomechanics with sensing, connectivity, and data.",
    "Our mission is to explore that future — carefully, with clinicians and engineers, and without pretending the work is finished.",
  ],
  principles: [
    {
      title: "Measure before you claim",
      text: "The company is in research and prototype development. Language on this site is written to match that stage.",
    },
    {
      title: "Leave the fixture in bone",
      text: "Intelligence is being designed into the crown and abutment so the osseointegrated implant can stay put.",
    },
    {
      title: "Respect the procedure",
      text: "A connected restoration should fit the way implant dentistry is practiced, not ask a clinic to become a software company.",
    },
    {
      title: "Build with the field",
      text: "Manufacturers, universities, and clinicians are the collaboration we are organizing around.",
    },
  ],
};

export const contact = {
  eyebrow: "Contact",
  title: ["Build the future", "of implant dentistry", "with us."],
  lede: "Tell us who you are and what you want to explore. This research-stage site opens the note in your email so it reaches the team directly.",
  roles: [
    "Dental clinician",
    "Researcher",
    "Implant manufacturer",
    "Engineer",
    "Investor",
    "Strategic partner",
  ],
};

export const closing = {
  title: ["The future of dentistry", "may already be", "inside the tooth."],
};

export const technologyPage = {
  title: "Technology",
  description:
    "The smart abutment architecture under development: ceramic crown, sensor layer, titanium abutment, and a conventional implant fixture.",
  eyebrow: "Technology",
  headline: ["Intelligence above", "the fixture."],
  lede: "A sensor-enabled abutment and crown stack, being developed so the implant in bone can remain a conventional titanium fixture.",
  points: [
    {
      title: "Serviceable stack",
      text: "Electronics are being placed in the crown and abutment. The intent is that a future service could happen without retrieving an osseointegrated implant.",
    },
    {
      title: "What we are designing to measure",
      text: "Implant loading, bite force, mechanical strain, temperature, clenching patterns, stability-related mechanical indicators, and long-term performance signals.",
    },
    {
      title: "What stays familiar",
      text: "Thread, connection, and surgical workflow should remain recognizable. The new work is the prosthetic layer and the record it could create.",
    },
    {
      title: "Internal studies",
      text: "MEMS strain sensing, force sensing, temperature, a microcontroller or ASIC, NFC or RFID, a miniature antenna, and passive or ultra-low-power electronics.",
    },
  ],
};

export const pageMeta = {
  platform: {
    title: "Platform",
    description:
      "A future path from a smart abutment to a clinical reader, cloud record, dentist dashboard, and longitudinal implant data.",
  },
  science: {
    title: "Science",
    description:
      "Research subjects behind Enamel Intelligence: implant biomechanics, strain sensing, MEMS, wireless power, and long-term monitoring.",
  },
  clinicians: {
    title: "For Clinicians",
    description:
      "Development goals for giving clinicians a new mechanical record of implant restorations without changing the art of dentistry.",
  },
  partners: {
    title: "For Partners",
    description:
      "A collaboration path for implant manufacturers: sensing technology designed to integrate with established implant ecosystems.",
  },
  company: {
    title: "Company",
    description:
      "Enamel Intelligence is a research-stage company exploring sensing, connectivity, and data for dental implant restorations.",
  },
  investors: {
    title: "Investors",
    description:
      "The company thesis: connected dental implants as a data layer spanning hardware, clinical software, and manufacturer integration.",
  },
  research: {
    title: "Research",
    description:
      "Collaboration with dental schools, universities, biomechanics laboratories, and oral-health researchers.",
  },
  contact: {
    title: "Contact",
    description:
      "Start a conversation with Enamel Intelligence as a clinician, researcher, manufacturer, engineer, investor, or partner.",
  },
  privacy: {
    title: "Privacy",
    description: "How the Enamel Intelligence website handles information.",
  },
  terms: {
    title: "Terms",
    description: "Terms for using the Enamel Intelligence website.",
  },
} as const;
