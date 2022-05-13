<script setup lang="ts">
import { useBoardsStore, type Column } from "@/stores/boards";

import ColumnTask from "./ColumnTask.vue";
import CustomDrop from "./CustomDrop.vue";
import CustomDrag, { type TransferDataType } from "./CustomDrag.vue";

interface IProps {
  column: Column;
  columnIndex: number;
}

const boardStore = useBoardsStore();

const { createTask, moveColumn: moveColumnAction } = boardStore;

const addNewTask = (e: any, tasks: any) => {
  createTask(tasks, e?.target?.value);
  e.target.value = "";
};

const props = defineProps<IProps>();

const moveColumn = (transferData: TransferDataType) => {
  const { fromColumnIndex } = transferData;

  moveColumnAction(fromColumnIndex, props.columnIndex);
};
</script>

<template>
  <CustomDrop @drop="moveColumn">
    <CustomDrag
      class="column"
      :transferData="{ type: 'column', fromColumnIndex: columnIndex }"
    >
      <div>{{ column.name }}</div>
      <div>
        <ColumnTask
          v-for="(task, taskIndex) of column.tasks"
          :key="task.id"
          :task="task"
          :taskIndex="taskIndex"
          :columnIndex="columnIndex"
          :column="column"
        />

        <input
          type="text"
          placeholder="+ add new tasl"
          @keyup.enter="addNewTask($event, column.tasks)"
        />
      </div>
    </CustomDrag>
  </CustomDrop>
</template>

<style scoped>
.column {
  height: 100%;
  border: 1px solid black;
  padding: 10px;
}
</style>
