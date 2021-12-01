import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import xh from "../locales/xh.json";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    xh: {
      translation: xh,
    },
  },
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
  debug: true,
  supportedLngs: ["en", "xh"],
  fallbackLng: "en",
  keySeparator: ".",
});

export default i18next;
