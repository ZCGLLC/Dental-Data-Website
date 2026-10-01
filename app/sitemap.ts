import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

const paths = [
  "",
  "/technology",
  "/platform",
  "/science",
  "/clinicians",
  "/partners",
  "/company",
  "/investors",
  "/research",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${brand.siteUrl}${path}`,
    lastModified: new Date("2026-10-01"),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
