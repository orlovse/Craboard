import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";
import { clickOutside } from "@/composables/useClickOutside";

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(router);

router.isReady().then(() => {
  app.directive("click-outside", clickOutside).mount("#app");
});
