<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useBoardsStore } from "@/stores/boards";
import BoardColumn from "@/components/BoardColumn.vue";
import CustomInput from "@/components/CustomInput.vue";
import CustomSkeleton from "@/components/CustomSkeleton.vue";

const boardStore = useBoardsStore();
const route = useRoute();
const router = useRouter();

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
  newColumnName.value = "";
};

const isTaskOpen = computed(() => {
  return route.name === "task";
});

const closeTaskModal = () => {
  router.push({ name: "board" });
};

const horizontalScroll = (event: WheelEvent) => {
  const element = event.target as HTMLDivElement;

  element.scrollLeft += event.deltaY;
};
</script>

<template>
  <div
    class="board-view"
    :style="{ 'background-image': `url('${boardImage}')` }"
    @wheel.passive="horizontalScroll"
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
        :column="column"
        :columnIndex="columnIndex"
        :key="column.name"
        v-for="(column, columnIndex) of selectedBoard"
      />
      <div class="column">
        <CustomInput
          @keyup.enter="addNewColumn"
          class="column-input"
          placeholder="Add new column"
          type="text"
          v-model="newColumnName"
        />
      </div>
    </div>
  </div>
  <router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <div class="task-bg" v-if="isTaskOpen" @click.self="closeTaskModal">
        <component :is="Component" />
      </div>
    </Transition>
  </router-view>
</template>

<style scoped>
.board-view {
  background-repeat: no-repeat;
  background-size: cover;
  height: calc(100vh - 50px);
  overflow-x: auto;
  padding: 20px;
  width: 100vw;
}

.loading-container {
  display: flex;
  gap: 20px;
  height: 50vh;
}

.board-container {
  display: flex;
  gap: 20px;
}
.skeleton-wrapper {
  border-radius: var(--border-radius-card);
  height: 100%;
  min-width: 280px;
  width: 280px;
}

.task-bg {
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  overflow: auto;
  position: absolute;
  top: 0;
  width: 100vw;
}

.column-input {
  width: 150px;
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
