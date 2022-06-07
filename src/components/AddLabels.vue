<script setup lang="ts">
import { useBoardsStore } from "@/stores/boards";
import { ref } from "@vue/reactivity";
import { computed, watch } from "vue";

import CustomButton from "./CustomButton.vue";
import CustomCheckbox from "./CustomCheckbox.vue";
import CustomInput from "./CustomInput.vue";

const { labels, addLabelAction } = useBoardsStore();

const isModalOpen = ref(false);
const newLabelname = ref("");
const isAllLabelsChecked = computed({
  get() {
    return labels.every((label) => {
      return label.isSelected;
    });
  },
  set(newValue: boolean) {
    if (newValue) {
      labels.map((label) => {
        label.isSelected = true;
      });
    } else {
      labels.map((label) => {
        label.isSelected = false;
      });
    }
  },
});

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const addNewLabel = () => {
  addLabelAction({
    id: `${labels.length + 1}`,
    name: newLabelname.value,
    color: "#ff0000",
    isSelected: false,
  });

  newLabelname.value = "";
};

const buttonText = computed(() => {
  return labels.length === 0 ? "Add label" : "Change labels";
});
</script>

<template>
  <div>
    <CustomButton @click="toggleModal" :text="buttonText" :isDefault="true" />
  </div>
  <div class="label-modal" v-if="isModalOpen">
    <CustomButton
      :isCloseButton="true"
      @click="toggleModal"
      class="close-button"
    />
    <div class="label-item">
      <CustomCheckbox v-model="isAllLabelsChecked" />
      <span>All</span>
    </div>
    <div v-for="label in labels" :key="label.id" class="label-item">
      <CustomCheckbox v-model="label.isSelected" />
      <input type="color" v-model="label.color" />
      <span @click="label.isSelected = !label.isSelected">{{
        label.name
      }}</span>
    </div>
    <CustomInput
      :isShowButton="true"
      @onButtonClick="addNewLabel"
      class="input-container"
      placeholder="Add new label"
      v-model="newLabelname"
    />
  </div>
</template>

<style scoped lang="scss">
.label-modal {
  box-shadow: var(--color-shadow);
  position: absolute;
  width: 300px;
  border: 1px solid var(--color-text-opposite);
  border-radius: var(--border-radius-card);
  top: 100px;
  right: 20px;
  background: var(--color-background-main);
  z-index: 5;
  padding: 40px 15px;
  overflow: auto;
}

.label-item {
  display: flex;
  gap: 10px;
  align-items: center;
}

.input-container {
  margin-top: 30px;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
