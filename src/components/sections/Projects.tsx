// src/components/sections/Projects.tsx
"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { GALLERY_IMAGES } from "@/lib/config";

export default function Projects() {
  const { t } = useTranslation();

  return (
    <section
      id="projects"
      className="section-padding bg-stone-100"
      aria-labelledby="projects-heading"
    >
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:gap-6 md:mb-12">
          <div>
            <p className="inline-flex items-center gap-2.5 mb-4 text-brand-700 font-body font-semibold text-sm tracking-widest uppercase">
              <span className="w-8 h-px bg-brand-500" aria-hidden="true" />
              {t("projects.eyebrow")}
            </p>
            <h2
              id="projects-heading"
              className="font-display text-fluid-3xl font-black text-stone-900 uppercase accent-line"
            >
              {t("projects.headline")}
            </h2>
          </div>
          <p className="text-stone-500 font-body text-sm max-w-xs leading-relaxed sm:text-right">
            {t("projects.description")}
          </p>
        </div>

        {/* Masonry-like responsive grid */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          aria-label="Construction project gallery"
        >
          {GALLERY_IMAGES.map(({ src, alt, width, height }, i) => (
            <li
              key={src}
              className={`overflow-hidden rounded-sm group relative ${
                i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <figure className="h-full">
                <div className="relative overflow-hidden aspect-[4/3] bg-stone-200 hover:cursor-pointer">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/45
                                flex items-end p-5 transition-all duration-300"
                    aria-hidden="true"
                  >
                    <figcaption
                      className="text-white font-body text-sm font-medium leading-snug
                                 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                                 transition-all duration-300"
                    >
                      {alt}
                    </figcaption>
                  </div>
                </div>
              </figure>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-stone-500 font-body mb-6">{t("projects.cta")}</p>
          <a href="#contact" className="btn-primary">
            {t("projects.button")}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
