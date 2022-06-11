<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import { computed } from "@vue/reactivity";
import { storeToRefs } from "pinia";

import { useUserStore } from "@/stores/user";
import { useBoardsStore } from "@/stores/boards";

import ThemeToggle from "@/components/ThemeToggle.vue";
import UploadFile from "@/components/UploadFile.vue";

const userStore = useUserStore();
const { isDarkTheme } = storeToRefs(userStore);

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
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/board/123">Board</RouterLink>
      </nav>
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
</style>
