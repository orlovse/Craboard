<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { Icon } from "@iconify/vue";

import {
  useBoardsStore,
  type ColumnType,
  type TaskType,
} from "@/stores/boards";

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

const boardStore = useBoardsStore();
const { selectedLabels } = storeToRefs(boardStore);

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

const complitedTasksCount = computed(() => {
  return props.task?.checklist?.list.filter((item) => item.isChecked).length;
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
    @dragLeave="dragLeave"
    @dragOver="dragOver"
    @drop="computedMoveTaskOrColumn"
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
      <div class="task-info">
        <span v-if="task.checklist" class="icon-with-text"
          ><Icon icon="uil:file-check-alt" width="18px" />
          {{ `${complitedTasksCount} / ${task.checklist?.list.length}` }}</span
        >
        <span v-if="task.comments" class="icon-with-text"
          ><Icon icon="uil:comment-lines" width="18px" />
          {{ task.comments?.length }}</span
        >
        <span v-if="task.files" class="icon-with-text"
          ><Icon icon="uil:cloud-upload" width="18px" />
          {{ task.files?.length }}</span
        >
      </div>
    </CustomDrag>
  </CustomDrop>
</template>

<style scoped>
.taskCard {
  -moz-box-shadow: -1px 19px 18px -11px rgba(0, 0, 0, 0.15);
  -webkit-box-shadow: -1px 19px 18px -11px rgba(0, 0, 0, 0.15);
  background: var(--color-elements);
  border-radius: 10px;
  border: 1px solid var(--color-elements);
  box-shadow: -1px 19px 18px -11px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  margin: 20px 0;
  padding: 20px;
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

.task-info {
  display: flex;
  gap: 15px;
}

.icon-with-text {
  display: flex;
  margin-top: 15px;
  align-items: center;
  gap: 5px;
}
</style>
