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
      class="propgress-bar"
      :totalCount="checklist.list.length"
      :currentValue="complitedTasksCount"
    />
    <TransitionGroup name="list" tag="ul" v-if="checklist.list">
      <li
        v-for="listItem of checklist.list"
        :key="listItem.id"
        class="list-item"
      >
        <CustomCheckbox
          :key="listItem.id"
          v-model="listItem.isChecked"
          :label="listItem.name"
        />
      </li>
    </TransitionGroup>
    <CustomInput
      :isShowButton="true"
      placeholder="Add new item"
      v-model="newItemName"
      @onButtonClick="addNewItem"
    />
  </div>
</template>

<style scoped lang="scss">
.checklist-card {
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
