<script setup lang="ts">
import {
  useBoardsStore,
  type ColumnType,
  type TaskKeyType,
  type TaskType,
} from "@/stores/boards";
import { computed } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const boardStore = useBoardsStore();
const { getBoardById, removeTaskAction, updateTaskAction } = boardStore;

const boardId = computed(() => {
  return route.params.boardId as string;
});

const taskId = computed(() => {
  return route.params.taskId as string;
});

const board = getBoardById(boardId.value);

let selectedTask: TaskType | null = null;
let selectedColumn: ColumnType | null = null;

board?.some((column) => {
  const isTaskColumn = column.tasks.some((task) => {
    if (task.id === taskId.value) {
      return (selectedTask = task);
    }
  });

  if (isTaskColumn) {
    selectedColumn = column;
  }
});

const deleteTask = () => {
  removeTaskAction(taskId.value, selectedColumn);
};

const updateTask = (event: KeyboardEvent, key: TaskKeyType) => {
  const target = event?.target as HTMLTextAreaElement;
  const value = target?.value;

  if (selectedTask && value) {
    updateTaskAction(selectedTask, key, value);
  }
};

const closeModal = () => {
  router.go(-1);
};
</script>

<template>
  <div class="task-view">
    <button @click="closeModal">Close</button>
    <textarea
      class="task-description"
      :value="selectedTask?.name"
      @keyup.enter="updateTask($event, 'name')"
    />
    <textarea
      class="task-description"
      :value="selectedTask?.description"
      @keyup.enter="updateTask($event, 'description')"
    />
    <button @click="deleteTask">Remove task</button>
  </div>
</template>

<style scoped>
.task-view {
  max-width: 700px;
  border: 1px solid blue;
  height: 80%;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.task-description {
  background: transparent;
}
</style>
