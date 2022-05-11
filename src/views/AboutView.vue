<script setup lang="ts">
import { useBoardsStore } from "@/stores/boards";
import { computed } from "@vue/reactivity";

import { useRoute, useRouter } from "vue-router";

const boardStore = useBoardsStore();
const route = useRoute();
const router = useRouter();

const { createTask, getBoardByName, getBoards } = boardStore;
const selectedBoard = getBoardByName("first");

const addNewTask = (tasks: any, e: any) => {
  createTask(tasks, e?.target?.value);
  e.target.value = "";
};

const isTaskOpen = computed(() => {
  return route.name === "task";
});

const openTaskModal = (taskId: string) => {
  router.push({ name: "task", params: { id: taskId } });
};

const closeTaskModal = () => {
  router.push({ name: "board" });
};

getBoards();
</script>

<template>
  <div class="board">
    <div class="column" v-for="column of selectedBoard" :key="column.name">
      <div>{{ column.name }}</div>
      <div>
        <div
          v-for="task of column.tasks"
          :key="task.id"
          class="card"
          @click="openTaskModal(task.id)"
        >
          <input type="text" :value="task.name" />
        </div>
        <input
          type="text"
          placeholder="+ add new task"
          @keyup.enter="addNewTask(column.tasks, $event)"
        />
      </div>
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

.task-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}
</style>
