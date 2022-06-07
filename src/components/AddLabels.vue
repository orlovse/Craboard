<script setup lang="ts">
import { useBoardsStore } from "@/stores/boards";
import { ref } from "@vue/reactivity";
import { computed } from "vue";

import ButtonWithConfirm from "@/components/ButtonWithConfirm.vue";
import CustomButton from "./CustomButton.vue";
import CustomCheckbox from "./CustomCheckbox.vue";
import CustomInput from "./CustomInput.vue";
import { storeToRefs } from "pinia";

const boardStore = useBoardsStore();

const { addLabelAction, removeLabelAction } = boardStore;

const { labels } = storeToRefs(boardStore);

const isModalOpen = ref(false);
const newLabelname = ref("");
const isAllLabelsChecked = computed({
  get() {
    return labels.value.every((label) => {
      return label.isSelected;
    });
  },
  set(newValue: boolean) {
    if (newValue) {
      labels.value.map((label) => {
        label.isSelected = true;
      });
    } else {
      labels.value.map((label) => {
        label.isSelected = false;
      });
    }
  },
});

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const closeModal = () => {
  if (isModalOpen.value) {
    isModalOpen.value = false;
  }
};

const addNewLabel = () => {
  addLabelAction({
    id: `${labels.value.length + 1}`,
    name: newLabelname.value,
    color: "#ff0000",
    isSelected: false,
  });

  newLabelname.value = "";
};

const buttonText = computed(() => {
  return labels.value.length === 0 ? "Add label" : "Change labels";
});
</script>

<template>
  <CustomButton
    @click.stop="toggleModal"
    :text="buttonText"
    :isDefault="true"
    class="add-labels-button"
  />
  <div class="label-modal" v-if="isModalOpen" v-click-outside="closeModal">
    <CustomButton
      :isCloseButton="true"
      @click.stop="toggleModal"
      class="close-button"
    />
    <div class="label-item__left">
      <CustomCheckbox v-model="isAllLabelsChecked" />
      <span>All</span>
    </div>
    <div v-for="label in labels" :key="label.id" class="label-item">
      <div class="label-item__left">
        <CustomCheckbox v-model="label.isSelected" />
        <input type="color" v-model="label.color" />
        <span @click="label.isSelected = !label.isSelected">{{
          label.name
        }}</span>
      </div>
      <ButtonWithConfirm
        @onConfirm="removeLabelAction(label.id)"
        class="delete-button"
        :isIcon="true"
        firstText="X"
        secondText="?"
      />
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
.add-labels-button {
  margin-bottom: 15px;
}

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
  padding: 60px 15px 20px;
  overflow: auto;
}

.label-item {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.label-item__left {
  display: flex;
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
