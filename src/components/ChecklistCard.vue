<script setup lang="ts">
import type { TaskChecklistType } from "@/stores/boards";
import CustomTextarea from "./CustomTextarea.vue";
import CustomCheckbox from "./CustomCheckbox.vue";
import ProgressBar from "./ProgressBar.vue";
import { computed } from "@vue/reactivity";

interface IProps {
  checklist: TaskChecklistType;
}

const props = defineProps<IProps>();
const emit = defineEmits(["updateChecklistName", "updateListItems"]);

const updateName = (value: string) => {
  emit("updateChecklistName", value);
};

const addNewItem = () => {
  emit("updateListItems", {
    id: new Date().getTime().toString(),
    isChecked: false,
    name: new Date().getTime().toString(),
    usersAssigned: null,
  });
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
    <button @click="addNewItem">Add new item</button>
  </div>
</template>

<style scoped lang="scss">
.checklist-card {
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
