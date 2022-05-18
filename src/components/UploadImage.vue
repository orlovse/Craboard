<script setup lang="ts">
import { ref } from "@vue/reactivity";

const emit = defineEmits(["uploadImage"]);

const filename = ref("");
const dragging = ref(false);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;

  const files = target.files;

  if (files) {
    const uploadedImage = files[0];
    const imageName = uploadedImage.name.split(".")[0];

    filename.value = imageName;

    const reader = new FileReader();
    reader.readAsDataURL(uploadedImage);

    reader.onload = () => {
      if (reader.result) {
        emit("uploadImage", reader.result);
      }
    };
  }
};
</script>

<template>
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
        <span class="link-text">Choose a file </span>
        <span class="drag-text">or drag it here</span>
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
</template>

<style scoped lang="scss">
.upload-area {
  position: relative;
  margin: 0 auto;
  border: 2px dashed var(--color-border);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  &.drag {
    border-color: var(--color-primary);

    .drag-text {
      color: var(--color-primary);
    }
  }

  &:hover .link-text {
    color: var(--color-primary);
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
