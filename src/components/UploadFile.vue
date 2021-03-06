<script setup lang="ts">
import { ref } from "@vue/reactivity";
import CustomButton from "./CustomButton.vue";

interface IProps {
  isDragAria?: boolean;
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
    :class="{ drag: dragging }"
    @dragend="dragging = false"
    @dragenter="dragging = true"
    @dragleave="dragging = false"
    @drop="dragging = false"
    class="upload-area"
    v-if="isDragAria"
  >
    <!-- <p v-if="filename">{{ filename }}</p> -->
    <div>
      <p>
        <span class="link-text">{{ $t("chooseFile") }}</span>
        <span class="drag-text">{{ $t("dragHere") }}</span>
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
  <CustomButton v-else :isIconButton="true" icon="uil:cloud-upload">
    <input
      id="file"
      type="file"
      class="file"
      :accept="uploadType"
      @input="updateValue"
    />
  </CustomButton>
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
}

.file {
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 0;
  opacity: 0;
}
</style>
