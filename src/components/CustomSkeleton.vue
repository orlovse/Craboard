<script setup lang="ts"></script>

<template>
  <div class="skeleton"></div>
</template>

<style scoped lang="scss">
.skeleton {
  animation: loader 1s infinite reverse;
  background-size: 200%;
  background: var(--color-background-skeleton);
  height: 100%;
  width: 100%;
}

@keyframes loader {
  from {
    background-position: -100% 0;
  }
  to {
    background-position: 100% 0;
  }
}
</style>
