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
  align-items: center;
  border-radius: 10px;
  border: 2px dashed var(--color-border);
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 20px;
  position: relative;

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
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
}
</style>
