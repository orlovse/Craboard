<script setup lang="ts">
import { watch } from "vue";
import { ref } from "@vue/reactivity";

import CustomButton from "./CustomButton.vue";
import CustomCheckbox from "./CustomCheckbox.vue";
import CustomTextarea from "./CustomTextarea.vue";
import type { CheckItemType } from "@/stores/boards";

interface IProps {
  listItem: CheckItemType;
}

const props = defineProps<IProps>();

const emit = defineEmits(["remove"]);

const itemText = ref(props.listItem.name);

const isEdit = ref(false);

watch(itemText, (newValue) => {
  const listItem = props.listItem;
  listItem.name = newValue;

  switchEdit();
});

const selectedListItem = ref(props.listItem);

const switchEdit = () => {
  isEdit.value = !isEdit.value;
};
</script>

<template>
  <div class="checklist-item">
    <CustomCheckbox v-model="selectedListItem.isChecked" />
    <div
      :class="{ checked: selectedListItem.isChecked }"
      @click="switchEdit"
      class="cbx-lbl"
      for="todo"
      v-if="!isEdit"
    >
      {{ itemText }}
    </div>
    <CustomTextarea
      v-else
      :isAutofocus="true"
      :isTitle="true"
      @onBlur="switchEdit"
      v-model="itemText"
      for="todo"
    />
    <CustomButton
      :isCloseButton="true"
      @click="emit('remove')"
      class="remove-button"
    />
  </div>
</template>

<style scoped lang="scss">
.checklist-item:hover {
  background-color: var(--color-elements);
  .remove-button {
    opacity: 1;
  }
}
.remove-button {
  opacity: 0;
  margin-inline-start: auto;
}

.cbx-lbl {
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease;

  &:after {
    background: #9098a9;
    content: "";
    height: 1px;
    left: 0;
    position: absolute;
    top: 50%;
    width: 0;
  }
}
.checklist-item {
  align-items: center;
  align-self: center;
  display: flex;
  padding: 8px;
  transform: translateZ(0);
}

.checked {
  color: #9098a9;
  &:after {
    width: 100%;
    transition: all 0.4s ease;
  }
}
</style>
