export type Sample = {
  axial: number;
  buccal: number;
  mesial: number;
  strain: number;
  temp: number;
  membrane: number;
};

const COUNT = 48;

function buildSamples(): Sample[] {
  const samples: Sample[] = [];
  for (let index = 0; index < COUNT; index += 1) {
    const hour = (index / COUNT) * 24;
    const awake = hour > 7 && hour < 22;
    const chew = awake ? Math.abs(Math.sin(index * 0.72)) : 0.12;
    const axial = Math.round(awake ? 238 + chew * 96 : 36 + Math.abs(Math.sin(index * 0.45)) * 22);
    samples.push({
      axial,
      buccal: Math.round(axial * 0.18),
      mesial: Math.round(axial * 0.14),
      strain: Math.round(420 + axial * 1.22),
      temp: Math.round((36.35 + (axial / 360) * 0.55) * 10) / 10,
      membrane: Math.round((axial / 347) * 180) / 100,
    });
  }
  const night = [176, 204, 191, 228];
  night.forEach((axial, offset) => {
    const sample = samples[offset + 1];
    if (!sample) return;
    sample.axial = axial;
    sample.buccal = Math.round(axial * 0.18);
    sample.mesial = Math.round(axial * 0.14);
    sample.strain = Math.round(420 + axial * 1.22);
    sample.temp = Math.round((36.35 + (axial / 360) * 0.55) * 10) / 10;
    sample.membrane = Math.round((axial / 347) * 180) / 100;
  });
  const peak = samples[30];
  if (peak) {
    peak.axial = 347;
    peak.buccal = 62;
    peak.mesial = 49;
    peak.strain = 842;
    peak.temp = 36.9;
    peak.membrane = 1.8;
  }
  return samples;
}

export const samples = buildSamples();

function mean(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function percentile(values: number[], p: number) {
  const sorted = [...values].sort((a, b) => a - b);
  const index = (sorted.length - 1) * p;
  const low = Math.floor(index);
  const high = Math.ceil(index);
  if (low === high) return sorted[low] ?? 0;
  const weight = index - low;
  return (sorted[low] ?? 0) * (1 - weight) + (sorted[high] ?? 0) * weight;
}

function deviation(values: number[]) {
  const mid = mean(values);
  return Math.sqrt(values.reduce((sum, value) => sum + (value - mid) ** 2, 0) / values.length);
}

const axial = samples.map((sample) => sample.axial);
const strain = samples.map((sample) => sample.strain);
const peak = samples[30] ?? samples[0];
const resultant = Math.round(
  Math.sqrt(peak.axial ** 2 + peak.buccal ** 2 + peak.mesial ** 2),
);

export const channels = [
  { id: "axial", label: "Axial load", unit: "N", color: "#1d6478", values: axial },
  { id: "strain", label: "Abutment strain", unit: "µε", color: "#141618", values: strain },
  {
    id: "temp",
    label: "Die temperature",
    unit: "°C",
    color: "#8a8176",
    values: samples.map((sample) => sample.temp),
  },
] as const;

export const ledger = [
  { label: "Axial peak", value: "347 N", note: "15:00 envelope" },
  { label: "Axial mean", value: `${Math.round(mean(axial))} N`, note: "24 h" },
  { label: "Axial P95", value: `${Math.round(percentile(axial, 0.95))} N`, note: "24 h" },
  { label: "Axial σ", value: `${Math.round(deviation(axial))} N`, note: "24 h" },
  { label: "Buccal-lingual peak", value: "62 N", note: "At axial peak" },
  { label: "Mesial-distal peak", value: "49 N", note: "At axial peak" },
  { label: "Resultant peak", value: `${resultant} N`, note: "Combined axes" },
  { label: "Strain peak", value: "842 µε", note: "Abutment" },
  { label: "Strain mean", value: `${Math.round(mean(strain))} µε`, note: "24 h" },
  {
    label: "Samples > 300 N",
    value: String(axial.filter((value) => value > 300).length),
    note: "Of 48",
  },
  { label: "Night events", value: "4", note: "Simulated log" },
  { label: "Quiet interval", value: "4.2 h", note: "Longest" },
  { label: "Channels", value: "6", note: "Concept die" },
  { label: "Sample rate", value: "128 Hz", note: "Burst" },
  { label: "Burst length", value: "40 ms", note: "Concept" },
  { label: "Duty cycle", value: "0.42%", note: "24 h" },
  { label: "ADC", value: "16-bit", note: "Concept" },
  { label: "Supply", value: "1.8 V", note: "Concept" },
  { label: "Die temperature", value: "36.9°C", note: "Peak" },
  { label: "Restoration temp", value: "36.7°C", note: "Companion" },
  { label: "Noise floor", value: "0.8% FS", note: "Simulated" },
  { label: "Read interval", value: "15 min", note: "NFC concept" },
  { label: "Packets", value: "96", note: "Simulated day" },
  { label: "Contact M/D/B/L", value: "28/31/22/19", note: "Percent" },
] as const;

export const dashboardMetrics = [
  ledger[0],
  ledger[1],
  ledger[2],
  ledger[6],
  ledger[7],
  ledger[9],
  ledger[13],
  ledger[15],
] as const;

export function clockLabel(progress: number) {
  const minutes = Math.floor(progress * 24 * 60) % (24 * 60);
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

export function sampleAt(progress: number) {
  const index = Math.min(samples.length - 1, Math.max(0, Math.floor(progress * samples.length)));
  return {
    index,
    ...(samples[index] as Sample),
    clock: clockLabel(index / samples.length),
  };
}

export function distributionAt(progress: number) {
  const wobble = Math.sin(progress * Math.PI * 2) * 2.2;
  const mesial = 28 + wobble;
  const distal = 31 - wobble * 0.45;
  const buccal = 22 + wobble * 0.25;
  const lingual = 100 - mesial - distal - buccal;
  return [
    { label: "Mesial", value: mesial },
    { label: "Distal", value: distal },
    { label: "Buccal", value: buccal },
    { label: "Lingual", value: lingual },
  ];
}
