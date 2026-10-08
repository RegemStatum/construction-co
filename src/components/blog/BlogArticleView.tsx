"use client";

import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { useTranslation } from "react-i18next";
import type { BlogBodyBlock, BlogPost } from "./types";

type Props = {
  post: BlogPost;
};

const portableTextComponents: PortableTextComponents<BlogBodyBlock> = {
  types: {
    image: ({ value }) => {
      if (value._type !== "image" || !value.asset?.url) return null;

      const dimensions = value.asset.metadata?.dimensions;

      return (
        <figure className="relative mx-auto my-10 max-w-[640px] md:h-[280px]">
          <Image
            src={value.asset.url}
            alt={value.alt || ""}
            width={dimensions?.width || 1200}
            height={dimensions?.height || 800}
            sizes="(max-width: 640px) 100vw, 640px"
            className="h-auto w-full md:absolute md:inset-0 md:h-full md:object-cover md:object-center"
          />
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href;
      const isSafeHref =
        typeof href === "string" &&
        (/^(https?:|mailto:|tel:)/i.test(href) || href.startsWith("/") || href.startsWith("#"));

      if (!isSafeHref) return <>{children}</>;

      return (
        <a
          href={href}
          className="text-brand-700 underline decoration-brand-300 underline-offset-4 hover:text-brand-900"
        >
          {children}
        </a>
      );
    },
  },
};

export default function BlogArticleView({ post }: Props) {
  const { t, i18n } = useTranslation();
  const dateValue = post.publishedAt ?? post._createdAt;
  const date = dateValue && !Number.isNaN(new Date(dateValue).getTime())
    ? new Intl.DateTimeFormat(i18n.language, { dateStyle: "long" }).format(new Date(dateValue))
    : null;
  const title = post.title || t("blog.untitled");

  return (
    <article className="container-site max-w-5xl pt-4 pb-12 md:pt-6 md:pb-16">
      <header className="mx-auto mb-10 w-full max-w-3xl text-left">
        <a
          href="/blog/"
          className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <span aria-hidden="true">←</span>
          {t("blog.backToBlog")}
        </a>

        <div className="mt-8 md:mt-6">
          {date && (
            <time dateTime={dateValue} className="text-sm text-stone-500">
              {date}
            </time>
          )}
          {post.author && (
            <p className="mt-2 text-sm text-stone-500">
              {t("blog.by")} {post.author}
            </p>
          )}
          {post.categories && post.categories.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label={t("blog.categories")}>
              {post.categories.map((category) => (
                <li
                  key={category._id}
                  className="bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-800"
                >
                  {category.title}
                </li>
              ))}
            </ul>
          )}
          <h1 className="mt-4 text-5xl md:text-7xl font-bold">{title}</h1>
        </div>
      </header>

      {post.body && post.body.length > 0 ? (
        <div className="mx-auto max-w-3xl text-lg leading-relaxed text-stone-700 [&_h2]:mt-12 [&_h2]:mb-5 [&_h2]:text-4xl [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-3xl [&_p]:mb-6 [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-500 [&_blockquote]:pl-6 [&_blockquote]:text-2xl [&_blockquote]:font-semibold [&_blockquote]:text-stone-900">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>
      ) : null}
    </article>
  );
}
