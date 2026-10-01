export const demo = {
  tooth: "30",
  sensorStatus: "Active",
  peakLoad: "347 N",
  currentLoad: "347 N",
  baseline: "291 N",
  change: "+19%",
  temperature: "36.7°C",
  identity: {
    record: "EI-SIM-30",
    site: "Tooth #30",
    platform: "Research geometry",
    restoration: "Zirconia crown concept",
    readout: "Prototype concept",
  },
  bruxism: [
    { time: "12:41 AM", load: "176 N" },
    { time: "12:53 AM", load: "204 N" },
    { time: "1:17 AM", load: "191 N" },
    { time: "2:08 AM", load: "228 N" },
  ],
  load7: [314, 328, 319, 333, 341, 336, 347],
  load30: [
    286, 290, 284, 297, 301, 288, 292, 310, 304, 298, 289, 295, 307, 312, 299,
    294, 303, 318, 322, 309, 301, 297, 314, 328, 319, 333, 341, 336, 344, 347,
  ],
  load90: [
    268, 272, 265, 270, 274, 269, 276, 281, 278, 273, 279, 284, 280, 277, 283,
    288, 285, 279, 286, 291, 287, 282, 289, 294, 290, 286, 292, 297, 293, 288,
    286, 290, 284, 297, 301, 288, 292, 310, 304, 298, 289, 295, 307, 312, 299,
    294, 303, 318, 322, 309, 301, 297, 314, 328, 319, 333, 341, 336, 344, 347,
    339, 332, 328, 334, 340, 336, 329, 325, 331, 338, 342, 337, 330, 326, 333,
    339, 345, 340, 334, 329, 335, 341, 348, 343, 338, 332, 336, 342, 347,
  ],
} as const;

export const demoRanges = [
  { id: "7", label: "7-day", series: demo.load7 },
  { id: "30", label: "30-day", series: demo.load30 },
  { id: "90", label: "90-day", series: demo.load90 },
] as const;
