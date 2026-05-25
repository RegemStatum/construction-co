import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import de from "@/locales/de.json";
import ru from "@/locales/ru.json";
import uk from "@/locales/uk.json";

const resources = {
  en: { translation: en },
  de: { translation: de },
  ru: { translation: ru },
  uk: { translation: uk },
};

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    resources,
    lng: "de",
    fallbackLng: "de",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

export default i18next;
