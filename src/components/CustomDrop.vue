<script setup lang="ts">
const emit = defineEmits(["drop", "dragOver", "dragLeave"]);

const onDrop = (event: DragEvent) => {
  const dataTransfer = event.dataTransfer;

  if (dataTransfer) {
    const transferData = JSON.parse(dataTransfer.getData("payload"));

    emit("drop", transferData);
    emit("dragLeave");
  }
};

const onDragOver = () => {
  emit("dragOver");
};

const onDragLeave = () => {
  emit("dragLeave");
};
</script>

<template>
  <div @drop.stop="onDrop" @dragover.stop="onDragOver" @dragleave="onDragLeave">
    <slot></slot>
  </div>
</template>

<style scoped></style>
