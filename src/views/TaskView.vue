<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";

import {
  useBoardsStore,
  type CheckItemType,
  type ColumnType,
  type CommentType,
  type TaskKeyType,
  type TaskType,
} from "@/stores/boards";

import AddLabels from "@/components/AddLabels.vue";
import ButtonWithConfirm from "@/components/ButtonWithConfirm.vue";
import ButtonWithInput from "@/components/ButtonWithInput.vue";
import ChecklistCard from "@/components/ChecklistCard.vue";
import CommentForm from "@/components/CommentForm.vue";
import CustomButton from "@/components/CustomButton.vue";
import CustomInput from "@/components/CustomInput.vue";
import CustomTextarea from "@/components/CustomTextarea.vue";
import TaskLabels from "@/components/TaskLabels.vue";
import UploadFile from "@/components/UploadFile.vue";

const route = useRoute();
const router = useRouter();
const boardStore = useBoardsStore();

const {
  addAttachmentAction,
  addCommentAction,
  editCommentAction,
  getBoardById,
  removeCommentAction,
  removeAttachmentAction,
  removeTaskAction,
  updateTaskAction,
} = boardStore;

const boardId = computed(() => {
  return route.params.boardId as string;
});

const taskId = computed(() => {
  return route.params.taskId as string;
});

const board = getBoardById(boardId.value)?.boardContent;

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

const commentText = ref("");

const addComment = () => {
  addCommentAction(commentText.value, selectedTask);
  commentText.value = "";
};

const removeComment = (commentId: string) => {
  removeCommentAction(commentId, selectedTask);
};

const editComment = (comment: CommentType, newCommentText: string) => {
  editCommentAction(comment, newCommentText);
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

const removeChecklist = () => {
  if (selectedTask) {
    selectedTask.checklist = null;
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

const addFile = (file: any) => {
  if (selectedTask) {
    addAttachmentAction(selectedTask, file);
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
    <div class="flex first-column">
      <CustomTextarea
        :isTitle="true"
        :placeholder="$t('title')"
        class="title"
        v-model="selectedTask.name"
      />
      <TaskLabels />
      <CustomTextarea
        :placeholder="$t('description')"
        class="description"
        v-model="selectedTask.description"
      />
      <ChecklistCard
        :checklist="selectedTask.checklist"
        @removeChecklist="removeChecklist"
        @updateChecklistName="updateChecklistName"
        @updateListItems="updateListItems"
        v-if="selectedTask.checklist"
      />
      <div>{{ `${$t("attachments")}:` }}</div>
      <ul v-if="selectedTask.files">
        <li
          v-for="file in selectedTask.files"
          :key="file.filename"
          class="file"
        >
          {{ file.filename }}
          <ButtonWithConfirm
            :isIcon="true"
            @onConfirm="removeAttachmentAction(selectedTask, file.filename)"
          />
        </li>
      </ul>
      <UploadFile @uploadFile="addFile" :isDragAria="true" />
      <div>
        <p>{{ `${$t("comments")}:` }}</p>
        <TransitionGroup name="list" tag="div" v-if="selectedTask.comments">
          <CommentForm
            v-for="comment in selectedTask.comments"
            @onRemoveComment="removeComment"
            @onEditComment="editComment"
            :comment="comment"
            :key="comment.id"
          />
        </TransitionGroup>
        <CustomInput
          :isShowButton="true"
          :placeholder="$t('addComment')"
          @onButtonClick="addComment"
          class="comment-input"
          v-model="commentText"
        />
      </div>
    </div>
    <div class="flex second-column">
      <div class="flex">
        <AddLabels />
        <ButtonWithInput
          :buttonText="$t('addChecklist')"
          :confirmButtontext="$t('confirm')"
          :isDisabled="!!selectedTask.checklist"
          :placeholder="$t('checklistName')"
          @addChecklist="addChecklist"
          @keyup.enter="addChecklist"
          v-model="newChecklistName"
        />
      </div>
      <ButtonWithConfirm
        @onConfirm="deleteTask"
        class="delete-button"
        :firstText="$t('delete')"
        :secondText="$t('confirm')"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.task-view {
  background: var(--color-background-main);
  border-radius: var(--border-radius-card);
  display: flex;
  gap: 40px;
  height: 80%;
  justify-content: space-between;
  overflow: auto;
  padding: 40px;
  position: relative;
  width: 700px;
}

.task-description {
  background: transparent;
}

.close-button {
  position: absolute;
  right: 10px;
  top: 10px;

  [dir="rtl"] & {
    left: 10px;
    right: unset;
  }
}

.delete-button {
  /* position: absolute;
  right: 10px;
  bottom: 10px; */
}

.title {
  font-size: 20px;
  font-weight: 600;
  min-height: 56px;
  overflow-wrap: break-word;
  overflow: hidden;
}

.description {
  min-height: 80px;
  overflow-wrap: break-word;
  overflow: hidden;
}

.flex {
  display: flex;
  flex-direction: column;
}

.first-column {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  padding-inline-end: 20px;
}

.second-column {
  align-items: end;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 20px;
}

.comment-input {
  max-width: 80%;
  margin: 10px auto;
}

.file {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
