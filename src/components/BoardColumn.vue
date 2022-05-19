<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";
import { useBoardsStore, type ColumnType } from "@/stores/boards";
import { useMoveTaskOrColumn } from "@/composables/useMoveTaskOrColumn";

import ColumnTask from "./ColumnTask.vue";
import CustomDrop from "./CustomDrop.vue";
import CustomDrag from "./CustomDrag.vue";
import CustomInput from "./CustomInput.vue";

interface IProps {
  column: ColumnType;
  columnIndex: number;
}

const boardStore = useBoardsStore();

const { createTaskAction } = boardStore;

const inputValue = ref("");

const createNewTask = () => {
  createTaskAction(props.column.tasks, inputValue.value);
  inputValue.value = "";
};

const props = defineProps<IProps>();

const computedMoveTaskOrColumn = computed(() => {
  return useMoveTaskOrColumn({
    columnIndex: props.columnIndex,
    column: props.column,
  });
});
</script>

<template>
  <CustomDrop @drop="computedMoveTaskOrColumn">
    <CustomDrag
      class="boardColumnCard"
      :transferData="{ type: 'column', fromColumnIndex: columnIndex }"
    >
      <div>{{ column.name }} ({{ column.tasks.length }})</div>
      <TransitionGroup name="tasks" tag="div">
        <ColumnTask
          v-for="(task, taskIndex) of column.tasks"
          :key="task.id"
          :task="task"
          :taskIndex="taskIndex"
          :columnIndex="columnIndex"
          :column="column"
        />
      </TransitionGroup>
      <CustomInput
        :isShowButton="true"
        placeholder="Add new task"
        v-model="inputValue"
        @onButtonClick="createNewTask"
      />
    </CustomDrag>
  </CustomDrop>
</template>

<style scoped>
.boardColumnCard {
  width: 280px;
  background: rgba(255, 255, 255, 0.21);
  border-radius: var(--border-radius-card);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.6px);
  -webkit-backdrop-filter: blur(6.6px);
  border: 1px solid rgba(255, 255, 255, 0.22);
  padding: 15px;
  height: 100%;
  transition: 1s;
}

.tasks-move,
.tasks-enter-active,
.tasks-leave-active {
  transition: all 0.5s ease;
}

.tasks-enter-from,
.tasks-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.tasks-leave-active {
  position: absolute;
}
</style>
