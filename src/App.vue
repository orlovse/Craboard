<script setup lang="ts">
import { watch } from "vue";
import { computed } from "@vue/reactivity";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";

import { useUserStore } from "@/stores/user";
import { useBoardsStore } from "@/stores/boards";

import CustomDropdown from "@/components/CustomDropdown.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";
import UploadFile from "@/components/UploadFile.vue";

const rtlLocales = ["ar", "he"];

const { availableLocales, locale, t } = useI18n();

const userStore = useUserStore();
const { isDarkTheme } = storeToRefs(userStore);

watch(locale, (newValue) => {
  if (rtlLocales.includes(newValue)) {
    document.dir = "rtl";
  } else {
    document.dir = "ltr";
  }
});

const boardStory = useBoardsStore();
const { setBoardImageAction } = boardStory;

const route = useRoute();

const boardId = computed(() => {
  return route.params.boardId as string;
});

const languagesList = computed(() => {
  return availableLocales.map((language) => {
    return {
      value: language,
      label: `${language} - ${t("languages." + language)}`,
    };
  });
});
</script>

<template>
  <div
    :class="isDarkTheme ? 'theme-dark' : 'theme-light'"
    class="main-container"
  >
    <header class="header">
      <nav>
        <RouterLink to="/">{{ $t("navigation.home") }}</RouterLink>
      </nav>
      <div class="settings">
        <CustomDropdown
          :dropdownList="languagesList"
          :selectedValue="$i18n.locale"
          @onSelectItem="(newLocale: string) => ($i18n.locale = newLocale)"
        />
        <UploadFile
          class="upload-container"
          uploadType="image/*"
          v-if="boardId"
          @uploadFile="setBoardImageAction"
        />
        <ThemeToggle />
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style>
@import "@/assets/base.css";
.header {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.main-container {
  height: 100vh;
  width: 100vw;
}

.language {
  cursor: pointer;
  margin-inline-end: 5px;
}

.settings {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
</style>
