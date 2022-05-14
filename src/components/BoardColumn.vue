<script setup lang="ts">
import { useBoardsStore, type ColumnType } from "@/stores/boards";

import ColumnTask from "./ColumnTask.vue";
import CustomDrop from "./CustomDrop.vue";
import CustomDrag from "./CustomDrag.vue";
import { useMoveTaskOrColumn } from "@/composables/useMoveTaskOrColumn";

interface IProps {
  column: ColumnType;
  columnIndex: number;
}

const boardStore = useBoardsStore();

const { createTaskAction } = boardStore;

const addNewTask = (e: any, tasks: any) => {
  createTaskAction(tasks, e?.target?.value);
  e.target.value = "";
};

const props = defineProps<IProps>();

const { moveTaskOrColumn } = useMoveTaskOrColumn({
  columnIndex: props.columnIndex,
  column: props.column,
});
</script>

<template>
  <CustomDrop @drop="moveTaskOrColumn">
    <CustomDrag
      class="boardColumnCard"
      :transferData="{ type: 'column', fromColumnIndex: columnIndex }"
    >
      <div>{{ column.name }}</div>
      <TransitionGroup name="list" tag="div">
        <ColumnTask
          v-for="(task, taskIndex) of column.tasks"
          :key="task.id"
          :task="task"
          :taskIndex="taskIndex"
          :columnIndex="columnIndex"
          :column="column"
        />
      </TransitionGroup>
      <input
        type="text"
        placeholder="+ add new tasl"
        @keyup.enter="addNewTask($event, column.tasks)"
      />
    </CustomDrag>
  </CustomDrop>
</template>

<style scoped>
.boardColumnCard {
  background: rgba(255, 255, 255, 0.21);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.6px);
  -webkit-backdrop-filter: blur(6.6px);
  border: 1px solid rgba(255, 255, 255, 0.22);
  padding: 10px;
  height: 100%;
  transition: 1s;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
