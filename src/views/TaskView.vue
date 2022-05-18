<script setup lang="ts">
import {
  useBoardsStore,
  type CheckItemType,
  type ColumnType,
  type TaskKeyType,
  type TaskType,
} from "@/stores/boards";
import { computed, ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import CustomTextarea from "@/components/CustomTextarea.vue";
import ChecklistCard from "@/components/ChecklistCard.vue";
import CustomButton from "@/components/CustomButton.vue";
import ButtonWithConfirm from "../components/ButtonWithConfirm.vue";
import ButtonWithInput from "../components/ButtonWithInput.vue";

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

const newChecklistName = ref("");

const addChecklist = () => {
  if (selectedTask) {
    selectedTask.checklist = {
      checklistName: newChecklistName.value,
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
    <CustomButton
      :isCloseButton="true"
      @click="closeModal"
      class="close-button"
    />
    <CustomTextarea
      :isTitle="true"
      class="title"
      placeholder="Title"
      v-model="selectedTask.name"
    />
    <CustomTextarea
      class="description"
      placeholder="Description"
      v-model="selectedTask.description"
    />
    <ButtonWithInput
      buttonText="Add checklist"
      placeholder="Checklist name"
      v-model="newChecklistName"
      @keypress.enter="addChecklist"
    />
    <ChecklistCard
      v-if="selectedTask.checklist"
      :checklist="selectedTask.checklist"
      @updateChecklistName="updateChecklistName"
      @updateListItems="updateListItems"
    />
    <ButtonWithConfirm
      class="delete-button"
      firstText="Delete"
      secondText="Confirm?"
      @onConfirm="deleteTask"
    />
  </div>
</template>

<style scoped>
.task-view {
  width: 700px;
  height: 80%;
  overflow: auto;
  background: var(--color-background-main);
  display: flex;
  flex-direction: column;
  padding: 40px;
  position: relative;
  border-radius: var(--border-radius-card);
}

.task-description {
  background: transparent;
}

.close-button {
  position: absolute;
  right: 10px;
  top: 10px;
}

.delete-button {
  position: absolute;
  right: 10px;
  bottom: 10px;
}

.title {
  overflow: hidden;
  overflow-wrap: break-word;
  min-height: 56px;
  font-size: 20px;
  font-weight: 600;
}

.description {
  min-height: 80px;
  overflow: hidden;
  overflow-wrap: break-word;
}
</style>
