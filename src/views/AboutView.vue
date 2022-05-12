<script setup lang="ts">
import { useBoardsStore } from "@/stores/boards";
import { computed, ref } from "@vue/reactivity";

import { useRoute, useRouter } from "vue-router";

const boardStore = useBoardsStore();
const route = useRoute();
const router = useRouter();

const newColumnName = ref("");

const {
  createTask,
  createColumn,
  getBoardByName,
  getBoards,
  moveTask: moveTaskAction,
  moveColumn: moveColumnAction,
} = boardStore;
const selectedBoard = getBoardByName("first");

const addNewTask = (tasks: any, e: any) => {
  createTask(tasks, e?.target?.value);
  e.target.value = "";
};

const addNewColumn = () => {
  createColumn(newColumnName.value);
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

const pickupTask = (e: any, taskIndex: number, fromColumnIndex: number) => {
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.dropEffect = "move";
  console.log("e", e);

  e.dataTransfer.setData("from-task-index", taskIndex);
  e.dataTransfer.setData("from-column-index", fromColumnIndex);
  e.dataTransfer.setData("type", "task");
};

const pickupColumn = (e: any, fromColumnIndex: number) => {
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.dropEffect = "move";

  e.dataTransfer.setData("from-column-index", fromColumnIndex);
  e.dataTransfer.setData("type", "column");
};

const moveTask = (e: any, toTasks: any[], toTaskIndex: number) => {
  const fromColumnIndex: number = e.dataTransfer.getData("from-column-index");
  const fromTaskIndex: number = e.dataTransfer.getData("from-task-index");

  const fromTasks =
    (selectedBoard && selectedBoard[fromColumnIndex]?.tasks) || [];
  moveTaskAction(fromTasks, toTasks, fromTaskIndex, toTaskIndex);
};

const moveColumn = (e: any, toColumnIndex: number) => {
  const fromColumnIndex = e.dataTransfer.getData("from-column-index");
  moveColumnAction(fromColumnIndex, toColumnIndex);
};

const moveTaskOrColumn = (
  e: any,
  toTasks: any[],
  toColumnIndex: number,
  toTaskIndex?: number
) => {
  const draggingElementType = e.dataTransfer.getData("type");
  if (draggingElementType === "task") {
    moveTask(
      e,
      toTasks,
      toTaskIndex !== undefined ? toTaskIndex : toTasks.length
    );
  } else {
    moveColumn(e, toColumnIndex);
  }
};

getBoards();
</script>

<template>
  <div class="board">
    <div
      class="column"
      v-for="(column, columnIndex) of selectedBoard"
      :key="column.name"
      draggable="true"
      @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
      @dragover.prevent
      @dragend.prevent
      @dragstart.self="pickupColumn($event, columnIndex)"
    >
      <div>{{ column.name }}</div>
      <div>
        <div
          v-for="(task, taskIndex) of column.tasks"
          :key="task.id"
          class="card"
          @click="openTaskModal(task.id)"
          draggable="true"
          @dragstart="pickupTask($event, taskIndex, columnIndex)"
          @dragover.prevent
          @dragend.prevent
          @drop.stop="
            moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)
          "
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
