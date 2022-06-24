<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";
import { useBoardsStore, type ColumnType } from "@/stores/boards";
import { useMoveTaskOrColumn } from "@/composables/useMoveTaskOrColumn";

import ColumnTask from "./ColumnTask.vue";
import CustomDrag from "./CustomDrag.vue";
import CustomDrop from "./CustomDrop.vue";
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

const isDragOver = ref(false);

const isDrag = ref(false);

const dragOver = () => {
  isDragOver.value = true;
};

const dragLeave = () => {
  isDragOver.value = false;
};

const dragStart = () => {
  isDrag.value = true;
};

const dragEnd = () => {
  isDrag.value = false;
};

const computedMoveTaskOrColumn = computed(() => {
  return useMoveTaskOrColumn({
    columnIndex: props.columnIndex,
    column: props.column,
  });
});
</script>

<template>
  <CustomDrop
    @dragLeave="dragLeave"
    @dragOver="dragOver"
    @drop="computedMoveTaskOrColumn"
  >
    <CustomDrag
      :class="{ dragOver: isDragOver, drag: isDrag }"
      :transferData="{ type: 'column', fromColumnIndex: columnIndex }"
      @dragend="dragEnd"
      @dragstart="dragStart"
      class="boardColumnCard"
    >
      <div>{{ column.name }} ({{ column.tasks.length }})</div>
      <TransitionGroup name="list" tag="div">
        <ColumnTask
          v-for="(task, taskIndex) of column.tasks"
          :column="column"
          :columnIndex="columnIndex"
          :key="task.id"
          :task="task"
          :taskIndex="taskIndex"
        />
      </TransitionGroup>
      <CustomInput
        :isShowButton="true"
        :placeholder="$t('addTask')"
        @onButtonClick="createNewTask"
        v-model="inputValue"
      />
    </CustomDrag>
  </CustomDrop>
</template>

<style scoped>
.boardColumnCard {
  -webkit-backdrop-filter: blur(6.6px);
  backdrop-filter: blur(6.6px);
  background: rgba(255, 255, 255, 0.21);
  border-radius: var(--border-radius-card);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  height: 100%;
  padding: 15px;
  transition: 0.2s;
  width: 280px;
}

.dragOver {
  border: 1px solid var(--color-primary);
}

.drag {
  opacity: 0.9;
}
</style>
