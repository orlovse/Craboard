import { createI18n } from "vue-i18n";
import { en } from "./en";

export const i18n = createI18n({
  locale: "en",
  allowComposition: true,
  fallbackLocale: "en",
  messages: {
    en,
  },
});
