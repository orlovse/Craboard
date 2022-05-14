<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useBoardsStore } from "@/stores/boards";
import BoardColumn from "@/components/BoardColumn.vue";

const boardStore = useBoardsStore();
const route = useRoute();
const router = useRouter();
console.log("route", route.query);

const newColumnName = ref("");

const { createColumnAction, getBoardById, getBoardAction } = boardStore;

getBoardAction();

const { loading } = storeToRefs(boardStore);

const boardId = computed(() => {
  return route.params.boardId as string;
});

const selectedBoard = computed(() => {
  return getBoardById(boardId.value);
});

const addNewColumn = () => {
  createColumnAction(newColumnName.value);
};

const isTaskOpen = computed(() => {
  return route.name === "task";
});

const closeTaskModal = () => {
  router.push({ name: "board" });
};
</script>

<template>
  <div class="board">
    <div v-if="loading">Loading</div>
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
  justify-content: center;
  gap: 20px;
  width: 100vw;
  overflow-x: auto;
}

.task-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
