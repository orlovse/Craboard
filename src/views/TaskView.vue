<script setup lang="ts">
import {
  useBoardsStore,
  type CheckItemType,
  type ColumnType,
  type TaskKeyType,
  type TaskType,
} from "@/stores/boards";
import { computed } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import CustomTextarea from "@/components/CustomTextarea.vue";
import ChecklistCard from "@/components/ChecklistCard.vue";

const route = useRoute();
const router = useRouter();
const boardStore = useBoardsStore();
const { getBoardById, removeTaskAction, updateTaskAction } = boardStore;

const boardId = computed(() => {
  return route.params.boardId as string;
});

const taskId = computed(() => {
  return route.params.taskId as string;
});

const board = getBoardById(boardId.value);

let selectedTask: TaskType | null = null;
let selectedColumn: ColumnType | null = null;

board?.some((column) => {
  const isTaskColumn = column.tasks.some((task) => {
    if (task.id === taskId.value) {
      return (selectedTask = task);
    }
  });

  if (isTaskColumn) {
    selectedColumn = column;
  }
});

const deleteTask = () => {
  removeTaskAction(taskId.value, selectedColumn);
};

const updateTask = (event: KeyboardEvent, key: TaskKeyType) => {
  const target = event?.target as HTMLTextAreaElement;
  const value = target?.value;

  if (selectedTask && value) {
    updateTaskAction(selectedTask, key, value);
  }
};

const closeModal = () => {
  router.go(-1);
};

const addCheckbox = () => {
  if (selectedTask) {
    selectedTask.checklist = {
      checklistName: "default name",
      list: [],
    };
  }
};

const updateChecklistName = (value: string) => {
  const checklist = selectedTask?.checklist;

  if (checklist) {
    checklist.checklistName = value;
  }
};

const updateListItems = (newItem: CheckItemType) => {
  const checklist = selectedTask?.checklist;

  if (checklist) {
    checklist.list.push(newItem);
  }
};
</script>

<template>
  <div class="task-view" v-if="selectedTask">
    <button @click="closeModal">Close</button>
    <CustomTextarea v-model="selectedTask.name" />
    <CustomTextarea v-model="selectedTask.description" />
    <button @click="addCheckbox" :disabled="Boolean(selectedTask.checklist)">
      Add checklist
    </button>
    <ChecklistCard
      v-if="selectedTask.checklist"
      :checklist="selectedTask.checklist"
      @updateChecklistName="updateChecklistName"
      @updateListItems="updateListItems"
    />
    <button @click="deleteTask">Remove task</button>
  </div>
</template>

<style scoped>
.task-view {
  max-width: 700px;
  border: 1px solid blue;
  height: 80%;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.task-description {
  background: transparent;
}
</style>
