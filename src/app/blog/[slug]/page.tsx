import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import BlogArticleView from "@/components/blog/BlogArticleView";
import type { BlogPost } from "@/components/blog/types";
import { SITE } from "@/lib/config";
import { sanityFetch } from "@/sanity/lib/live";
import { POST_QUERY } from "@/sanity/lib/queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const getPost = cache(async (slug: string) => {
  const { data } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
    perspective: "published",
    stega: false,
  });

  return data as BlogPost | null;
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return {};

  const title = post.title || "Blog";
  const description = post.excerpt?.slice(0, 160) || title;
  const url = `${SITE.url}/blog/${slug}/`;
  const image = post.mainImage?.url;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      ...(image ? { images: [{ url: image, alt: post.mainImage?.alt || title }] } : {}),
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <>
      <Header solid />
      <main id="main-content" className="min-h-screen pt-20 md:pt-28">
        <BlogArticleView post={post} />
      </main>
      <Footer />
    </>
  );
}
