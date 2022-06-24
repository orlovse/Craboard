import { createI18n } from "vue-i18n";
import { en } from "./en";
import { he } from "./he";
import { ru } from "./ru";

export const i18n = createI18n({
  allowComposition: true,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    he,
    ru,
  },
});
