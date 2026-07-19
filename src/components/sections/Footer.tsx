// src/components/sections/Footer.tsx
"use client";

import { useTranslation } from "react-i18next";
import { SITE, NAV_LINKS, SERVICES } from "@/lib/config";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-stone-950 text-stone-400 font-body"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* Main footer content */}
      <div className="container-site pt-10 pb-8 md:pt-16 md:pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 md:gap-10 md:mb-12">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="/"
              className="flex items-center gap-2.5 mb-5 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-sm"
              aria-label={`${SITE.name} homepage`}
            >
              <span className="flex-shrink-0 w-9 h-9 text-brand-500 flex items-center justify-center" aria-hidden="true">
                <svg width="36" height="36" viewBox="0 0 30 30" fill="none">
                  <path d="M15 2L27 8.5V21.5L15 28L3 21.5V8.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M15 15V28M15 15L27 8.5M15 15L3 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M3 8.5L15 28" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
                </svg>
              </span>
              <span className="font-display logo-wordmark font-bold text-white uppercase tracking-wide leading-none">
                {SITE.name}
              </span>
            </a>

            <p className="text-stone-500 text-sm leading-relaxed mb-6 max-w-xs">
              {t("footer.brandDescription")}
            </p>

            {/* Social links */}
            <div className="flex gap-3" aria-label="Social media">
              {SITE.social.facebook && (
                <a
                  href={SITE.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Facebook – ${SITE.name}`}
                  className="w-9 h-9 rounded-sm border border-stone-700 flex items-center justify-center
                             text-stone-500 hover:text-white hover:border-stone-500 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              )}
              {SITE.social.instagram && (
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram – ${SITE.name}`}
                  className="w-9 h-9 rounded-sm border border-stone-700 flex items-center justify-center
                             text-stone-500 hover:text-white hover:border-stone-500 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="font-display text-base font-bold text-white uppercase tracking-wider mb-5">
              {t("footer.navigate")}
            </h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(({ id, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm hover:text-brand-400 transition-colors"
                  >
                    {t(`nav.${id}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services navigation">
            <h3 className="font-display text-base font-bold text-white uppercase tracking-wider mb-5">
              {t("footer.services")}
            </h3>
            <ul className="flex flex-col gap-3">
              {SERVICES.map(({ id, titleKey }) => (
                <li key={id}>
                  <a
                    href="#services"
                    className="text-sm hover:text-brand-400 transition-colors"
                  >
                    {t(titleKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-display text-base font-bold text-white uppercase tracking-wider mb-5">
              {t("footer.contact")}
            </h3>
            <address className="not-italic flex flex-col gap-3 text-sm">
              <p>
                {SITE.address.street}
                <br />
                {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
              </p>
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-brand-400 transition-colors">
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="hover:text-brand-400 transition-colors">
                {SITE.email}
              </a>
            </address>
          </div>
        </div>

        {/* Divider + bottom bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500 text-center sm:text-left">
            {t("footer.copyright", { year, siteName: SITE.name })}
          </p>
          <nav aria-label="Legal" className="flex items-center gap-4 text-xs text-stone-500">
            <a href="/impressum/" className="hover:text-brand-400 transition-colors">
              {t("footer.legalImpressum")}
            </a>
            <a href="/datenschutz/" className="hover:text-brand-400 transition-colors">
              {t("footer.legalDatenschutz")}
            </a>
          </nav>
          <p className="text-xs text-stone-500">
            {t("footer.locationNote", {
              city: SITE.address.city,
              state: SITE.address.state,
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}
