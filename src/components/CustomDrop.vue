<script setup lang="ts">
const emit = defineEmits(["drop"]);

const onDrop = (event: DragEvent) => {
  const dataTransfer = event.dataTransfer;
  if (dataTransfer) {
    const transferData = JSON.parse(dataTransfer.getData("payload"));

    emit("drop", transferData);
  }
};
</script>

<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot></slot>
  </div>
</template>

<style scoped></style>
