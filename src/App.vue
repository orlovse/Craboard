<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

import { computed } from "@vue/reactivity";
import { storeToRefs } from "pinia";

import { useUserStore } from "@/stores/user";
import { useBoardsStore } from "@/stores/boards";

import ThemeToggle from "@/components/ThemeToggle.vue";
import UploadFile from "@/components/UploadFile.vue";
import { watch } from "vue";

const rtlLocales = ["ar", "he"];

const { locale } = useI18n();

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
      <div>
        <span
          v-for="locale in $i18n.availableLocales"
          :key="`locale-${locale}`"
          @click="() => ($i18n.locale = locale)"
          class="language"
        >
          {{ locale }}
        </span>
      </div>

      <UploadFile
        class="upload-container"
        uploadType="image/*"
        v-if="boardId"
        @uploadFile="setBoardImageAction"
      />
      <ThemeToggle />
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
</style>
