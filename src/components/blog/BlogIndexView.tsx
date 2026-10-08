"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { getBlogPostDate, type BlogPostSummary } from "./types";

type Props = {
  posts: BlogPostSummary[];
};

export default function BlogIndexView({ posts }: Props) {
  const { t, i18n } = useTranslation();

  const formatDate = (value?: string) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return new Intl.DateTimeFormat(i18n.language, { dateStyle: "long" }).format(date);
  };

  return (
    <section className="container-site section-padding">
      <header className="max-w-3xl mb-12 md:mb-16">
        <p className="text-brand-600 font-semibold uppercase tracking-[0.18em] text-sm mb-3">
          {t("blog.eyebrow")}
        </p>
        <h1 className="text-5xl md:text-7xl font-bold uppercase">{t("blog.title")}</h1>
        <p className="mt-5 text-lg text-stone-600">{t("blog.description")}</p>
      </header>

      {posts.length === 0 ? (
        <div className="border border-stone-200 bg-white p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold">{t("blog.emptyTitle")}</h2>
          <p className="mt-3 text-stone-600">{t("blog.emptyDescription")}</p>
        </div>
      ) : (
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const date = formatDate(getBlogPostDate(post));
            const title = post.title || t("blog.untitled");

            return (
              <li key={post._id}>
                <article className="h-full bg-white border border-stone-200 shadow-card hover:shadow-card-hover transition-shadow">
                  <Link
                    href={`/blog/${post.slug}/`}
                    className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    aria-label={`${t("blog.readMore")}: ${title}`}
                  >
                    {post.mainImage?.url ? (
                      <Image
                        src={post.mainImage.url}
                        alt={post.mainImage.alt || title}
                        width={960}
                        height={540}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="aspect-video w-full object-cover"
                      />
                    ) : (
                      <div className="aspect-video w-full bg-stone-200" aria-hidden="true" />
                    )}
                    <div className="p-6 md:p-7">
                      {date && (
                        <time
                          dateTime={getBlogPostDate(post)}
                          className="text-sm text-stone-500"
                        >
                          {date}
                        </time>
                      )}
                      {post.categories && post.categories.length > 0 && (
                        <ul className="mt-3 flex flex-wrap gap-2" aria-label={t("blog.categories")}>
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
                      <h2 className="mt-3 text-3xl font-bold group-hover:text-brand-700 transition-colors">
                        {title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-3 text-stone-600 line-clamp-3">{post.excerpt}</p>
                      )}
                      <span className="mt-5 inline-flex font-semibold text-brand-700">
                        {t("blog.readMore")}
                        <span aria-hidden="true" className="ml-2">→</span>
                      </span>
                    </div>
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
