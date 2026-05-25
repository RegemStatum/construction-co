export const supportedLocales = ["en", "de", "ru", "uk"] as const;
export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "en";

export const languageNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  ru: "Русский",
  uk: "Українська",
};
