<script setup lang="ts">
import { useBoardsStore, type TaskType } from "@/stores/boards";
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";

const route = useRoute();
const boardStore = useBoardsStore();
const { getBoardById } = boardStore;

const boardId = computed(() => {
  return route.params.boardId as string;
});

const taskId = computed(() => {
  return route.params.taskId;
});

const board = getBoardById(boardId.value);

let selectedTask: TaskType | null = null;

board?.some((column) => {
  column.tasks.some((task) => {
    if (task.id === taskId.value) {
      selectedTask = task;
    }
  });
});
</script>

<template>
  <div class="task-view">
    {{ selectedTask?.name }}
    <textarea class="task-description" :value="selectedTask?.description" />
  </div>
</template>

<style scoped>
.task-view {
  max-width: 700px;
  border: 1px solid blue;
}

.task-description {
  background: transparent;
}
</style>
