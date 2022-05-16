<script setup lang="ts">
import { useBoardsStore } from "@/stores/boards";
import { ref } from "@vue/reactivity";

const boardStory = useBoardsStore();

const { setBoardImage } = boardStory;

const filename = ref("");
const dragging = ref(false);
const fileLink = ref("");
const updateValue = (e) => {
  console.log("e", e);

  const uploadedImage = e.target.files[0];
  const imageName = uploadedImage.name.split(".")[0];
  console.log("uploadedImage", uploadedImage, "imageName", imageName);
  filename.value = imageName;

  const reader = new FileReader();
  reader.readAsDataURL(uploadedImage);
  reader.onload = () => {
    console.log("reader.result", reader.result);
    setBoardImage(reader.result);
  };
};
</script>

<template>
  <main>
    <div
      class="upload-area"
      :class="{ drag: dragging }"
      @dragenter="dragging = true"
      @dragend="dragging = false"
      @drop="dragging = false"
      @dragleave="dragging = false"
    >
      <p v-if="filename">{{ filename }}</p>
      <div v-else>
        <p>
          <span class="primary-text">Choose a file</span>
          or drag it here
        </p>
      </div>
      <input
        id="file"
        type="file"
        class="file"
        accept="image/*"
        @input="updateValue"
      />
    </div>
  </main>
</template>

<style scoped lang="scss">
.upload-area {
  position: relative;
  margin: 0 auto;
  border: 3px dashed #e3e3e3;
  border-radius: 10px;
  padding: 20px;

  &.drag {
    border-color: var(--color-primary);
  }

  .upload-icon {
    width: 50px;
    height: 50px;
    color: #dadde2;
    margin-bottom: 30px;
    margin-top: 22px;
  }

  .file {
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>
