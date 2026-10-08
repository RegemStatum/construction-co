// src/components/sections/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SITE, NAV_LINKS } from "@/lib/config";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

type Props = { solid?: boolean };

export default function Header({ solid = false }: Props) {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState("");

  /* Scroll state for sticky header shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-50% 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const { t } = useTranslation();

  const handleNavClick = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || solid || mobileOpen
          ? "bg-stone-950/95 backdrop-blur-sm shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
      role="banner"
    >
      <div className="container-site flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-sm"
          aria-label={`${SITE.name} – go to homepage`}
        >
          {/* Icon mark */}
          <span className="flex-shrink-0 w-9 h-9 text-brand-500 flex items-center justify-center" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 30 30" fill="none">
              <path d="M15 2L27 8.5V21.5L15 28L3 21.5V8.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M15 15V28M15 15L27 8.5M15 15L3 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M3 8.5L15 28" stroke="currentColor" strokeWidth="1.3" opacity="0.6"/>
            </svg>
          </span>
          <span className="font-display logo-wordmark font-bold text-white uppercase tracking-wide leading-none">
            {SITE.name}
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-3"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(({ id, href }) => {
            const sectionId = href.replace("#", "");
            return (
              <a
                key={href}
                href={href}
                className={`px-4 py-2 rounded-sm font-body font-medium text-sm transition-colors duration-150
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400
                  ${activeSection === sectionId
                    ? "text-brand-400"
                    : "text-stone-300 hover:text-white"
                  }`}
              >
                {t(`nav.${id}`)}
              </a>
            );
          })}

          <a
            href="/blog/"
            className="px-4 py-2 rounded-sm font-body font-medium text-sm transition-colors duration-150
                       text-stone-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            {t("nav.blog")}
          </a>

          <LanguageSwitcher id="language-select" label={t("header.language")} />

          <a
            href="#contact"
            className="ml-3 btn-primary !py-2.5 !px-5 !text-sm"
          >
            {t("header.quote")}
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 text-stone-300 hover:text-white transition-colors
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-sm"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle mobile navigation"
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden mt-4 bg-stone-950/98 border-t border-stone-800"
          aria-label="Mobile navigation"
        >
          <div className="container-site py-4 flex flex-col gap-3">
            {NAV_LINKS.map(({ id, href }) => (
              <a
                key={href}
                href={href}
                onClick={handleNavClick}
                className="px-4 py-3 text-stone-200 hover:text-white hover:bg-stone-800
                           font-body font-medium text-base rounded-sm transition-colors"
              >
                {t(`nav.${id}`)}
              </a>
            ))}
            <a
              href="/blog/"
              onClick={handleNavClick}
              className="px-4 py-3 text-stone-200 hover:text-white hover:bg-stone-800
                         font-body font-medium text-base rounded-sm transition-colors"
            >
              {t("nav.blog")}
            </a>
            <div className="px-4 py-3 bg-stone-900 rounded-sm border border-stone-800">
              <LanguageSwitcher id="language-select-mobile" label={t("header.language")} labelVisible fullWidth />
            </div>
            <a
              href="#contact"
              onClick={handleNavClick}
              className="btn-primary mt-2 justify-center"
            >
              {t("header.quote")}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
