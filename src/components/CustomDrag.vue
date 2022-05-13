<script setup lang="ts">
interface IProps {
  transferData: string;
}

const props = defineProps<IProps>();

const onDrag = (event: DragEvent) => {
  const dataTransfer = event.dataTransfer;

  if (dataTransfer) {
    dataTransfer.effectAllowed = "move";
    dataTransfer.dropEffect = "move";

    dataTransfer.setData("payload", JSON.stringify(props.transferData));
  }
};
</script>

<template>
  <div
    draggable="true"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot></slot>
  </div>
</template>

<style scoped></style>
