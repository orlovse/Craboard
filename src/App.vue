<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const { isDarkTheme } = storeToRefs(userStore);
const { switchThemeAction } = userStore;
</script>

<template>
  <div
    :class="isDarkTheme ? 'theme-dark' : 'theme-light'"
    class="main-container"
  >
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/board/123">Board</RouterLink>
      </nav>
      <button @click="switchThemeAction">Theme</button>
    </header>

    <RouterView />
  </div>
</template>

<style>
@import "@/assets/base.css";

.main-container {
  min-height: 100vh;
}
</style>
