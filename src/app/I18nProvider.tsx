"use client";

import { ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import { supportedLocales } from "@/lib/i18n";

export default function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const storedLocale = window.localStorage.getItem("locale");
    const nextLocale = supportedLocales.includes(storedLocale as any)
      ? storedLocale!
      : "de";

    const setLocaleAttributes = (locale: string) => {
      document.documentElement.lang = locale;
      document.documentElement.dataset.locale = locale;
    };

    setLocaleAttributes(nextLocale);
    void i18n.changeLanguage(nextLocale);

    const handleLanguageChanged = (locale: string) => {
      setLocaleAttributes(locale);
    };

    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
