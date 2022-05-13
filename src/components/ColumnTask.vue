<script setup lang="ts">
import { useRouter } from "vue-router";

import type { Column, Task } from "@/stores/boards";
import { useBoardsStore } from "@/stores/boards";

import CustomDrag, { type TransferDataType } from "./CustomDrag.vue";
import CustomDrop from "./CustomDrop.vue";

interface IProps {
  task: Task;
  taskIndex: number;
  columnIndex: number;
  column: Column;
}

const props = defineProps<IProps>();

const router = useRouter();

const boardStore = useBoardsStore();

const { moveTask: moveTaskAction, getBoardByName } = boardStore;

const selectedBoard = getBoardByName("first");

const openTaskModal = (taskId: string) => {
  router.push({ name: "task", params: { id: taskId } });
};

const moveTask = (transferData: TransferDataType) => {
  const { fromColumnIndex, fromTaskIndex } = transferData;

  const fromTasks =
    (selectedBoard && selectedBoard[fromColumnIndex]?.tasks) || [];

  moveTaskAction(
    fromTasks,
    props.column?.tasks,
    fromTaskIndex || 0,
    props.taskIndex
  );
};
</script>

<template>
  <CustomDrop @drop="moveTask">
    <CustomDrag
      class="taskCard"
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex,
      }"
      @click="openTaskModal(task.id)"
    >
      <span> {{ task.name }}</span>
      <p v-if="task.description">{{ task.description }}</p>
    </CustomDrag>
  </CustomDrop>
</template>

<style scoped>
.taskCard {
  border: 1px solid red;
  padding: 20px;
  margin: 10px;
}
</style>
