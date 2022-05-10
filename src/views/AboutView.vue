<script setup lang="ts">
import { useBoardsStore } from "@/stores/boards";

const boardStore = useBoardsStore();

const { getBoardByName, getBoards } = boardStore;
const selectedBoard = getBoardByName("first");
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
  </div>
</template>

<style>
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
