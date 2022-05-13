<script setup lang="ts">
export type TransferDataType = {
  type: string;
  fromColumnIndex: number;
  fromTaskIndex?: number;
};

interface IProps {
  transferData: TransferDataType;
}

const props = defineProps<IProps>();

const emit = defineEmits(["dragEnter"]);

const onDrag = (event: DragEvent) => {
  const dataTransfer = event.dataTransfer;

  if (dataTransfer) {
    dataTransfer.effectAllowed = "move";
    dataTransfer.dropEffect = "move";

    dataTransfer.setData("payload", JSON.stringify(props.transferData));
  }
};

const onDragEnter = () => {
  emit("dragEnter");
};
</script>

<template>
  <div
    draggable="true"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter="onDragEnter"
  >
    <slot></slot>
  </div>
</template>

<style scoped></style>
