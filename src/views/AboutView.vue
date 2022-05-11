<script setup lang="ts">
import { useBoardsStore } from "@/stores/boards";
import { computed } from "@vue/reactivity";

import { useRoute } from "vue-router";

const boardStore = useBoardsStore();
const route = useRoute();

const { getBoardByName, getBoards } = boardStore;
const selectedBoard = getBoardByName("first");

const isTaskOpen = computed(() => {
  return route.name === "task";
});

getBoards();
</script>

<template>
  <div class="board">
    <div class="column" v-for="column of selectedBoard" :key="column.name">
      <div>{{ column.name }}</div>
      <div>
        <div v-for="task of column.tasks" :key="task.id" class="card">
          {{ task.name }}
        </div>
      </div>
    </div>
    <div class="task-bg" v-if="isTaskOpen">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.board {
  display: flex;
  gap: 20px;
}

.column {
  height: 100%;
  border: 1px solid black;
  padding: 10px;
}

.card {
  border: 1px solid red;
  padding: 20px;
  margin: 10px;
}
</style>
