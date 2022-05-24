<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";

import type { TaskChecklistType } from "@/stores/boards";

import CustomButton from "./CustomButton.vue";
import ChecklistItem from "./ChecklistItem.vue";
import CustomInput from "./CustomInput.vue";
import CustomTextarea from "./CustomTextarea.vue";
import ProgressBar from "./ProgressBar.vue";

interface IProps {
  checklist: TaskChecklistType;
}

const props = defineProps<IProps>();
const emit = defineEmits([
  "removeChecklist",
  "updateChecklistName",
  "updateListItems",
]);

const updateName = (value: string) => {
  emit("updateChecklistName", value);
};

const newItemName = ref("");

const addNewItem = () => {
  emit("updateListItems", {
    id: new Date().getTime().toString(),
    isChecked: false,
    name: newItemName.value,
    usersAssigned: null,
  });

  newItemName.value = "";
};

const complitedTasksCount = computed(() => {
  return props.checklist.list.reduce((acc, checkitem) => {
    if (checkitem.isChecked) {
      acc++;
    }

    return acc;
  }, 0);
});

const removeListItem = (index: number) => {
  const list = props.checklist.list;
  list.splice(index, 1);
};
</script>

<template>
  <div class="checklist-card">
    <div class="title-container">
      <CustomTextarea
        placeholder="Checkbox name"
        :model-value="checklist.checklistName"
        @update:model-value="updateName"
      />
      <CustomButton
        :isCloseButton="true"
        @click="emit('removeChecklist')"
        class="remove-button"
      />
    </div>

    <ProgressBar
      :currentValue="complitedTasksCount"
      :totalCount="checklist.list.length"
      class="propgress-bar"
    />
    <TransitionGroup name="list" tag="ul" v-if="checklist.list">
      <li
        :key="listItem.id"
        class="list-item"
        v-for="(listItem, index) of checklist.list"
      >
        <ChecklistItem
          :key="listItem.id"
          :listItem="listItem"
          @remove="removeListItem(index)"
        />
      </li>
    </TransitionGroup>
    <CustomInput
      :isShowButton="true"
      @onButtonClick="addNewItem"
      class="add-input"
      placeholder="Add new item"
      v-model="newItemName"
    />
  </div>
</template>

<style scoped lang="scss">
.title-container {
  display: flex;
}
.remove-button {
  margin-inline-start: auto;
}
.checklist-card {
  padding: 5px;
}

.add-input {
  width: 200px;
  margin-top: 10px;
}

.propgress-bar {
  margin-bottom: 20px;
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
