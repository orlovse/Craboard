<script setup lang="ts">
import { useBoardsStore } from "@/stores/boards";
import { ref } from "@vue/reactivity";
import { computed } from "vue";

import CustomButton from "./CustomButton.vue";
import CustomCheckbox from "./CustomCheckbox.vue";
import CustomInput from "./CustomInput.vue";

const { labels, addLabelAction } = useBoardsStore();

const isModalOpen = ref(false);
const newLabelname = ref("");

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
      placeholder="Add new label"
      v-model="newLabelname"
    />
  </div>
</template>

<style scoped lang="scss">
.label-modal {
  position: absolute;
  width: 300px;
  height: 500px;
  border: 1px solid black;
  bottom: 20px;
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

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
