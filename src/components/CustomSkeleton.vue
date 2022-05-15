<script setup lang="ts"></script>

<template>
  <div class="skeleton"></div>
</template>

<style scoped lang="scss">
.skeleton {
  width: 100%;
  height: 100%;
  background: var(--color-background-skeleton);
  background-size: 200%;
  animation: loader 1s infinite reverse;
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
