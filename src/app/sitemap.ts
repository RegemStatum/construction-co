// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { client } from "@/sanity/lib/client";
import { SITEMAP_POSTS_QUERY } from "@/sanity/lib/queries";

type SitemapPost = {
  slug: string;
  publishedAt?: string | null;
  _updatedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch<SitemapPost[]>(
    SITEMAP_POSTS_QUERY,
    {},
    { perspective: "published" },
  );

  return [
    {
      url:              SITE.url,
      lastModified:     new Date(),
      changeFrequency:  "monthly",
      priority:         1,
    },
    {
      url:              `${SITE.url}/blog/`,
      changeFrequency:  "weekly",
      priority:         0.8,
    },
    ...posts.map((post) => ({
      url: `${SITE.url}/blog/${post.slug}/`,
      lastModified: new Date(post._updatedAt || post.publishedAt || new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
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
