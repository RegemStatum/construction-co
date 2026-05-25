// src/components/sections/About.tsx
"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { SITE } from "@/lib/config";

const TRUST_SIGNALS = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M14 3L4 8v7c0 5.25 4.25 10.15 10 11.35C19.75 25.15 24 20.25 24 15V8L14 3Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M10 14l3 3 5-5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    titleKey: "trustSignals.licensed",
    descKey: "trustSignals.licensedDesc",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="14"
          cy="14"
          r="10"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M14 9v5l3 3"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ),
    titleKey: "trustSignals.onTime",
    descKey: "trustSignals.onTimeDesc",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 22l6-6 4 4 10-12"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    titleKey: "trustSignals.quality",
    descKey: "trustSignals.qualityDesc",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M14 4l2.5 5 5.5.8-4 3.9.95 5.5L14 16.5 9.05 19.2 10 13.7 6 9.8l5.5-.8L14 4Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    ),
    titleKey: "trustSignals.rated",
    descKey: "trustSignals.ratedDesc",
  },
] as const;

export default function About() {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="section-padding bg-white"
      aria-labelledby="about-heading"
    >
      <div className="container-site">
        {/* Layout: text col + image col */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Text */}
          <div>
            <p className="inline-flex items-center gap-2.5 mb-4 text-brand-600 font-body font-semibold text-sm tracking-widest uppercase">
              <span className="w-8 h-px bg-brand-500" aria-hidden="true" />
              {t("about.eyebrow")}
            </p>
            <h2
              id="about-heading"
              className="font-display text-fluid-3xl font-black text-stone-900 uppercase mb-6 accent-line"
            >
              {t("about.headlineLine1")}
              <br />
              <span className="text-brand-500">{t("about.headlineAccent")}</span>
            </h2>
            <p className="text-stone-600 text-fluid-base mb-5 leading-relaxed">
              {t("about.paragraph1", {
                year: SITE.founded,
                siteName: SITE.name,
              })}
            </p>
            <p className="text-stone-600 text-fluid-base mb-8 leading-relaxed">
              {t("about.paragraph2")}
            </p>
            <a href="#contact" className="btn-primary">
              {t("about.workWithUs")}
            </a>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-sm overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80"
                alt={t("about.eyebrow")}
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            {/* Accent badge */}
            <div
              className="absolute -bottom-5 -left-5 bg-brand-500 text-white rounded-sm px-6 py-5 shadow-brand"
              aria-label={`${new Date().getFullYear() - SITE.founded} years of experience`}
            >
              <p className="font-display text-4xl font-black leading-none">
                {new Date().getFullYear() - SITE.founded}+
              </p>
              <p className="font-body text-xs uppercase tracking-wider text-brand-100 mt-1">
                {t("about.workWithUs")}
              </p>
            </div>
          </div>
        </div>

        {/* Trust signal cards */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          role="list"
          aria-label="Trust signals"
        >
          {TRUST_SIGNALS.map(({ icon, titleKey, descKey }) => (
            <div
              key={titleKey}
              role="listitem"
              className="group flex flex-col gap-4 p-6 rounded-sm border border-stone-100
                         bg-stone-50 hover:bg-white hover:border-brand-200 hover:shadow-card
                         transition-all duration-300"
            >
              <span className="text-brand-500 group-hover:scale-110 transition-transform duration-300 w-fit">
                {icon}
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-stone-900 uppercase mb-2">
                  {t(titleKey)}
                </h3>
                <p className="font-body text-sm text-stone-600 leading-relaxed">
                  {t(descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
