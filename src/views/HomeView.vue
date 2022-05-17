<script setup lang="ts">
import { useBoardsStore } from "@/stores/boards";
import { ref } from "@vue/reactivity";
import UploadImage from "../components/UploadImage.vue";

const boardStory = useBoardsStore();

const { setBoardImage } = boardStory;
</script>

<template>
  <main>
    <UploadImage class="upload-container" @uploadImage="setBoardImage" />
  </main>
</template>

<style scoped lang="scss">
.upload-container {
  width: 300px;
  height: 150px;
}
</style>
