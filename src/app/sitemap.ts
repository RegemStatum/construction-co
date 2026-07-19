// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:              SITE.url,
      lastModified:     new Date(),
      changeFrequency:  "monthly",
      priority:         1,
    },
    {
      url:              `${SITE.url}/impressum/`,
      lastModified:     new Date(),
      changeFrequency:  "yearly",
      priority:         0.3,
    },
    {
      url:              `${SITE.url}/datenschutz/`,
      lastModified:     new Date(),
      changeFrequency:  "yearly",
      priority:         0.3,
    },
  ];
}
