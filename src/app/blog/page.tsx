import type { Metadata } from "next";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import BlogIndexView from "@/components/blog/BlogIndexView";
import type { BlogPostSummary } from "@/components/blog/types";
import { SITE } from "@/lib/config";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Blog",
  description: `Tipps, Einblicke und Neuigkeiten von ${SITE.name}.`,
  alternates: {
    canonical: `${SITE.url}/blog/`,
  },
};

export default async function BlogPage() {
  const { data } = await sanityFetch({
    query: POSTS_QUERY,
    perspective: "published",
    stega: false,
  });

  return (
    <>
      <Header solid />
      <main id="main-content" className="min-h-screen pt-20 md:pt-24">
        <BlogIndexView posts={(data ?? []) as BlogPostSummary[]} />
      </main>
      <Footer />
    </>
  );
}
