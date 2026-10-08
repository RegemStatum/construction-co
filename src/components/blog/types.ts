import type { PortableTextBlock } from "@portabletext/react";

export type BlogCategory = {
  _id: string;
  title?: string | null;
};

export type BlogImage = {
  alt?: string | null;
  url?: string | null;
  dimensions?: {
    width?: number;
    height?: number;
  } | null;
};

export type BlogPostSummary = {
  _id: string;
  title?: string | null;
  slug: string;
  publishedAt?: string | null;
  _createdAt: string;
  excerpt?: string | null;
  author?: string | null;
  categories?: BlogCategory[] | null;
  mainImage?: BlogImage | null;
};

export type BlogBodyImage = {
  _type: "image";
  _key?: string;
  alt?: string | null;
  asset?: {
    url?: string | null;
    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
      } | null;
    } | null;
  } | null;
};

export type BlogBodyBlock = PortableTextBlock | BlogBodyImage;

export type BlogPost = BlogPostSummary & {
  body?: BlogBodyBlock[] | null;
};

export function getBlogPostDate(post: BlogPostSummary): string | undefined {
  return post.publishedAt ?? post._createdAt;
}
