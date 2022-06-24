import { createI18n } from "vue-i18n";
import { en } from "./en";

const rtlLocales = ["ar", "he"];

const browserLocale = navigator.language.split("-")[0];

const selectedLocale = browserLocale || "en";

if (rtlLocales.includes(selectedLocale)) {
  document.dir = "rtl";
}

export const i18n = createI18n({
  allowComposition: true,
  locale: selectedLocale,
  fallbackLocale: "en",
  messages: {
    en,
  },
});
