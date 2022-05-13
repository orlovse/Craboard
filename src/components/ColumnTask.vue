<script setup lang="ts">
import { useRouter } from "vue-router";

import type { ColumnType, TaskType } from "@/stores/boards";

import CustomDrag from "./CustomDrag.vue";
import CustomDrop from "./CustomDrop.vue";
import { useMoveTaskOrColumn } from "@/composables/useMoveTaskOrColumn";

interface IProps {
  task: TaskType;
  taskIndex: number;
  columnIndex: number;
  column: ColumnType;
}

const props = defineProps<IProps>();

const router = useRouter();

const openTaskModal = (taskId: string) => {
  router.push({ name: "task", params: { taskId } });
};

const { moveTaskOrColumn } = useMoveTaskOrColumn({
  column: props.column,
  taskIndex: props.taskIndex || 0,
});
</script>

<template>
  <CustomDrop @drop="moveTaskOrColumn">
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
