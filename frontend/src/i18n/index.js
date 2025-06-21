import i18n from "i18next";
import ICU from "i18next-icu";
import { initReactI18next } from "react-i18next";

import { en } from "./en";
import { ru } from "./ru";

const resources = {
  en,
  ru,
};

i18n
  .use(ICU)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: "translation",
    fallbackLng: "ru",
    lng: "ru",
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };
