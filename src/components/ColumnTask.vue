<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed, ref } from "@vue/reactivity";
import type { ColumnType, TaskType } from "@/stores/boards";

import CustomDrag from "./CustomDrag.vue";
import CustomDrop from "./CustomDrop.vue";
import { useMoveTaskOrColumn } from "@/composables/useMoveTaskOrColumn";

interface IProps {
  task: TaskType;
  taskIndex: number;
  columnIndex: number;
  column: ColumnType;
}

const props = defineProps<IProps>();

const router = useRouter();

const isDragOver = ref(false);

const isDrag = ref(false);

const openTaskModal = (taskId: string) => {
  router.push({ name: "task", params: { taskId } });
};

const computedMoveTaskOrColumn = computed(() => {
  return useMoveTaskOrColumn({
    column: props.column,
    taskIndex: props.taskIndex || 0,
  });
});

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
</script>

<template>
  <CustomDrop
    @drop="computedMoveTaskOrColumn"
    @dragOver="dragOver"
    @dragLeave="dragLeave"
  >
    <CustomDrag
      class="taskCard"
      :class="{ dragOver: isDragOver, drag: isDrag }"
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex,
      }"
      @click="openTaskModal(task.id)"
      @dragstart="dragStart"
      @dragend="dragEnd"
    >
      <span> {{ task.name }}</span>
      <p v-if="task.description">{{ task.description }}</p>
    </CustomDrag>
  </CustomDrop>
</template>

<style scoped>
.taskCard {
  cursor: pointer;
  border-radius: 10px;
  background: var(--color-elements);
  border: 1px solid var(--color-elements);
  box-shadow: -1px 19px 18px -11px rgba(0, 0, 0, 0.15);
  -webkit-box-shadow: -1px 19px 18px -11px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: -1px 19px 18px -11px rgba(0, 0, 0, 0.15);
  padding: 20px;
  margin: 20px 0;
  transition: 0.3s;
}

.dragOver {
  border: 1px solid var(--color-primary);
  transform: translateY(-10%);
}

.drag {
  opacity: 0.2;
}

.taskCard:hover {
  transform: translateY(-2%);
}
</style>
