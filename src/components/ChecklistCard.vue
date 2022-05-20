<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";

import type { TaskChecklistType } from "@/stores/boards";

import CustomCheckbox from "./CustomCheckbox.vue";
import CustomInput from "./CustomInput.vue";
import CustomTextarea from "./CustomTextarea.vue";
import ProgressBar from "./ProgressBar.vue";

interface IProps {
  checklist: TaskChecklistType;
}

const props = defineProps<IProps>();
const emit = defineEmits(["updateChecklistName", "updateListItems"]);

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
</script>

<template>
  <div class="checklist-card">
    <CustomTextarea
      :model-value="checklist.checklistName"
      @update:model-value="updateName"
    />
    <ProgressBar
      :currentValue="complitedTasksCount"
      :totalCount="checklist.list.length"
      class="propgress-bar"
    />
    <TransitionGroup name="list" tag="ul" v-if="checklist.list">
      <li
        :key="listItem.id"
        class="list-item"
        v-for="listItem of checklist.list"
      >
        <CustomCheckbox
          :key="listItem.id"
          :label="listItem.name"
          v-model="listItem.isChecked"
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
.checklist-card {
  padding: 5px;
}

.add-input {
  width: 200px;
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
