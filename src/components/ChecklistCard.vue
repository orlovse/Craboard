<script setup lang="ts">
import type { TaskChecklistType } from "@/stores/boards";
import CustomTextarea from "./CustomTextarea.vue";
import CustomCheckbox from "./CustomCheckbox.vue";

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
</script>

<template>
  <div class="checklist-card">
    <CustomTextarea
      :model-value="checklist.checklistName"
      @update:model-value="updateName"
    />
    <ul v-if="checklist.list">
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
    </ul>
    <button @click="addNewItem">Add new item</button>
  </div>
</template>

<style scoped lang="scss">
.checklist-card {
}
</style>
