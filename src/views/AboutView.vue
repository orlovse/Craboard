<script setup lang="ts">
import { useBoardsStore } from "@/stores/boards";

const boardStore = useBoardsStore();

const { getBoardByName, getBoards } = boardStore;
const selectedBoard = getBoardByName("first");
getBoards();
</script>

<template>
  <div class="board">
    <div>
      <div class="column" v-for="column of selectedBoard" :key="column.name">
        <div>{{ column.name }}</div>
        <div>
          <div v-for="task of column.tasks" :key="task.id">
            {{ task.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .board {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
