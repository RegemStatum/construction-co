// src/components/ui/LanguageSwitcher.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { languageNames, supportedLocales } from "@/lib/i18n";

type Props = {
  id: string;
  label: string;
  labelVisible?: boolean;
  fullWidth?: boolean;
};

export default function LanguageSwitcher({ id, label, labelVisible = false, fullWidth = false }: Props) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || "de");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleLanguageChanged = (locale: string) => setCurrentLanguage(locale || "de");
    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const selectLanguage = async (locale: string) => {
    await i18n.changeLanguage(locale);
    setCurrentLanguage(locale);
    window.localStorage.setItem("locale", locale);
    setOpen(false);
  };

  const labelId = `${id}-label`;

  return (
    <div ref={rootRef} className={`relative ${fullWidth ? "w-full" : ""}`}>
      <span id={labelId} className={labelVisible ? "block text-xs text-stone-400 mb-2 uppercase tracking-[0.24em]" : "sr-only"}>
        {label}
      </span>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelId}
        className={`flex items-center gap-2 rounded-sm border border-stone-700 bg-stone-950/60 px-3 py-2
                    text-sm text-stone-200 transition-colors hover:border-stone-500 hover:text-white
                    focus:outline-none focus:ring-2 focus:ring-brand-400
                    ${fullWidth ? "w-full justify-between" : ""}`}
      >
        <span className="flex items-center gap-2">
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="flex-shrink-0 text-stone-400">
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4" />
            <path d="M2 10h16M10 2a13 13 0 0 1 0 16M10 2a13 13 0 0 0 0 16" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          {languageNames[currentLanguage as keyof typeof languageNames] ?? currentLanguage}
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
          className={`flex-shrink-0 text-stone-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-labelledby={labelId}
          className={`absolute z-20 mt-1.5 overflow-hidden rounded-sm border border-stone-700 bg-stone-900 py-1 shadow-lg
                      ${fullWidth ? "left-0 right-0" : "right-0 w-44"}`}
        >
          {supportedLocales.map((locale) => (
            <li key={locale} role="option" aria-selected={locale === currentLanguage}>
              <button
                type="button"
                onClick={() => selectLanguage(locale)}
                className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors
                            ${
                              locale === currentLanguage
                                ? "bg-brand-500/10 text-brand-400"
                                : "text-stone-300 hover:bg-stone-800 hover:text-white"
                            }`}
              >
                {languageNames[locale]}
                {locale === currentLanguage && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2.5 7.3l3 3 6-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
