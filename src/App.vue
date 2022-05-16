<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import ThemeToggle from "./components/ThemeToggle.vue";

const userStore = useUserStore();
const { isDarkTheme } = storeToRefs(userStore);
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
