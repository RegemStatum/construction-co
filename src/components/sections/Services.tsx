// src/components/sections/Services.tsx
"use client";

import { useTranslation } from "react-i18next";
import { SERVICES } from "@/lib/config";
import ServiceIcon from "@/components/ui/ServiceIcon";

export default function Services() {
  const { t } = useTranslation();

  return (
    <section
      id="services"
      className="section-padding bg-white"
      aria-labelledby="services-heading"
    >
      <div className="container-site">
        {/* Section header */}
        <div className="text-center mb-8 md:mb-14">
          <p className="inline-flex items-center gap-2.5 mb-4 text-brand-700 font-body font-semibold text-sm tracking-widest uppercase">
            <span className="w-8 h-px bg-brand-500" aria-hidden="true" />
            {t("servicesSection.eyebrow")}
            <span className="w-8 h-px bg-brand-500" aria-hidden="true" />
          </p>
          <h2
            id="services-heading"
            className="font-display text-fluid-3xl font-black text-stone-900 uppercase accent-line accent-line-center"
          >
            {t("servicesSection.headline")}
          </h2>
          <p className="mt-6 text-stone-500 text-fluid-base max-w-xl mx-auto">
            {t("servicesSection.description")}
          </p>
        </div>

        {/* Services grid */}
        <ul
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          aria-label="Construction services"
        >
          {SERVICES.map(({ id, icon, titleKey, descriptionKey }) => (
            <li key={id}>
              <article className="service-card group h-full hover:border-brand-200">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-sm bg-brand-500/10 border border-brand-500/20
                              flex items-center justify-center text-brand-600 mb-5
                              group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500
                              transition-all duration-300"
                  aria-hidden="true"
                >
                  <ServiceIcon icon={icon} className="w-6 h-6" />
                </div>

                {/* Text */}
                <h3 className="font-display text-xl font-bold text-stone-900 uppercase mb-3">
                  {t(titleKey)}
                </h3>
                <p className="font-body text-sm text-stone-600 leading-relaxed">
                  {t(descriptionKey)}
                </p>

                {/* CTA hint */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 mt-5 text-brand-700 text-sm font-semibold
                             hover:text-brand-800 transition-colors group/link"
                  aria-label={t("servicesSection.getQuote")}
                >
                  {t("servicesSection.getQuote")}
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    className="group-hover/link:translate-x-1 transition-transform duration-150"
                    aria-hidden="true"
                  >
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
