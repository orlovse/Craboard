<script setup lang="ts">
import { useBoardsStore, type Task } from "@/stores/boards";
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";

const route = useRoute();
const boardStore = useBoardsStore();
const { getBoardByName } = boardStore;

const board = getBoardByName("first");

const taskId = computed(() => {
  return route.params.id;
});

let selectedTask: Task | null = null;

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
  </div>
</template>

<style scoped>
.task-view {
  max-width: 700px;
  border: 1px solid blue;
}
</style>
