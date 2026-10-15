import type { Metadata } from "next";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import BlogIndexView from "@/components/blog/BlogIndexView";
import type { BlogPostSummary } from "@/components/blog/types";
import { SITE } from "@/lib/config";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: `Tipps, Einblicke und Neuigkeiten von ${SITE.name}.`,
  alternates: {
    canonical: `${SITE.url}/blog/`,
  },
};

export default async function BlogPage() {
  const posts = await client.fetch<BlogPostSummary[]>(
    POSTS_QUERY,
    {},
    {
      perspective: "published",
      useCdn: false,
      cache: "no-store",
    },
  );

  return (
    <>
      <Header solid />
      <main id="main-content" className="min-h-screen pt-20 md:pt-24">
        <BlogIndexView posts={posts} />
      </main>
      <Footer />
    </>
  );
}
