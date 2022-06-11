<script setup lang="ts">
import { ref } from "@vue/reactivity";

interface IProps {
  uploadType?: string;
}

withDefaults(defineProps<IProps>(), {
  uploadType: "",
});

const emit = defineEmits(["uploadFile"]);

const filename = ref("");
const dragging = ref(false);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;

  const files = target.files;

  if (files) {
    const uploadedFile = files[0];
    const uploadedFileName = uploadedFile.name.split(".")[0];

    filename.value = uploadedFileName;

    const reader = new FileReader();
    reader.readAsDataURL(uploadedFile);

    reader.onload = () => {
      if (reader.result) {
        emit("uploadFile", { filename: uploadedFileName, file: reader.result });
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
    <!-- <p v-if="filename">{{ filename }}</p> -->
    <div>
      <p>
        <span class="link-text">Choose a file </span>
        <span class="drag-text">or drag it here</span>
      </p>
    </div>
    <input
      id="file"
      type="file"
      class="file"
      :accept="uploadType"
      @input="updateValue"
    />
  </div>
</template>

<style scoped lang="scss">
.upload-area {
  border-radius: 10px;
  border: 2px dashed var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
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
