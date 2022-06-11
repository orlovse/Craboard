<script setup lang="ts">
import { useBoardsStore } from "@/stores/boards";
import UploadFile from "@/components/UploadFile.vue";

const boardStory = useBoardsStore();

const { setBoardImage } = boardStory;
</script>

<template>
  <main>
    <UploadFile
      class="upload-container"
      uploadType="image/*"
      @uploadFile="setBoardImage"
    />
  </main>
</template>

<style scoped lang="scss">
.upload-container {
  width: 300px;
  height: 150px;
}
</style>
