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

const onDrag = (event: DragEvent) => {
  const dataTransfer = event.dataTransfer;

  if (dataTransfer) {
    dataTransfer.effectAllowed = "move";
    dataTransfer.dropEffect = "move";
    console.log("props", props.transferData);

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
