<script setup lang="ts">
import { useBoardsStore } from "@/stores/boards";
import { computed, ref } from "@vue/reactivity";

import { useRoute, useRouter } from "vue-router";

import BoardColumn from "@/components/BoardColumn.vue";

const boardStore = useBoardsStore();
const route = useRoute();
const router = useRouter();

const newColumnName = ref("");

const { createColumn, getBoardByName, getBoards } = boardStore;
const selectedBoard = getBoardByName("first");

const addNewColumn = () => {
  createColumn(newColumnName.value);
};

const isTaskOpen = computed(() => {
  return route.name === "task";
});

const closeTaskModal = () => {
  router.push({ name: "board" });
};

getBoards();
</script>

<template>
  <div class="board">
    <BoardColumn
      v-for="(column, columnIndex) of selectedBoard"
      :key="column.name"
      :column="column"
      :columnIndex="columnIndex"
    />
    <div class="column">
      <input type="text" v-model="newColumnName" @keyup.enter="addNewColumn" />
    </div>
    <div class="task-bg" v-if="isTaskOpen" @click.self="closeTaskModal">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.board {
  display: flex;
  gap: 20px;
}

.task-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}
</style>
