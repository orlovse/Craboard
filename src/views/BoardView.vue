<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useBoardsStore } from "@/stores/boards";
import BoardColumn from "@/components/BoardColumn.vue";
import CustomSkeleton from "../components/CustomSkeleton.vue";

const boardStore = useBoardsStore();
const route = useRoute();
const router = useRouter();
console.log("route", route.query);

const newColumnName = ref("");

const { createColumnAction, getBoardById, getBoardAction } = boardStore;

getBoardAction();

const { boardLoading, boardImage } = storeToRefs(boardStore);

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
  <div
    class="board-view"
    :style="{ 'background-image': `url('${boardImage}')` }"
  >
    <div v-if="boardLoading" class="loading-container">
      <CustomSkeleton
        class="skeleton-wrapper"
        v-for="index in 4"
        :key="index"
      />
    </div>
    <div class="board-container" v-else>
      <BoardColumn
        v-for="(column, columnIndex) of selectedBoard"
        :key="column.name"
        :column="column"
        :columnIndex="columnIndex"
      />
      <!-- <div class="column">
        <input
          type="text"
          v-model="newColumnName"
          @keyup.enter="addNewColumn"
        />
      </div> -->
    </div>

    <Transition name="fade" mode="out-in">
      <div class="task-bg" v-if="isTaskOpen" @click.self="closeTaskModal">
        <router-view />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.board-view {
  height: calc(100vh - 50px);
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  overflow-x: auto;
  padding: 20px;
}

.loading-container {
  height: 50vh;
  display: flex;
  gap: 20px;
}

.board-container {
  display: flex;
  gap: 20px;
}
.skeleton-wrapper {
  min-width: 280px;
  width: 280px;
  height: 100%;
  border-radius: var(--border-radius-card);
}

.task-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
