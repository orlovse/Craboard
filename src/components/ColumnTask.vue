<script setup lang="ts">
import { useRouter } from "vue-router";

import type { ColumnType, TaskType } from "@/stores/boards";

import CustomDrag from "./CustomDrag.vue";
import CustomDrop from "./CustomDrop.vue";
import { useMoveTaskOrColumn } from "@/composables/useMoveTaskOrColumn";
import { ref } from "vue";

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

const { moveTaskOrColumn } = useMoveTaskOrColumn({
  column: props.column,
  taskIndex: props.taskIndex || 0,
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
    @drop="moveTaskOrColumn"
    @dragOver="dragOver"
    @dragLeave="dragLeave"
  >
    <CustomDrag
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex,
      }"
      @click="openTaskModal(task.id)"
      @dragstart="dragStart"
      @dragend="dragEnd"
    >
      <div class="taskCard" :class="{ dragOver: isDragOver, drag: isDrag }">
        <span> {{ task.name }}</span>
        <p v-if="task.description">{{ task.description }}</p>
      </div>
    </CustomDrag>
  </CustomDrop>
</template>

<style scoped>
.taskCard {
  border: 1px solid red;
  padding: 20px;
  margin: 10px;
  transition: 0.3s;
}

.dragOver {
  border-color: green;
  transform: translateY(-50%);
}

.drag {
  opacity: 0.2;
}

.taskCard:hover {
  transform: translateY(-5%);
}
</style>
