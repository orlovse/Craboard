<script setup lang="ts">
import { computed, ref, reactive } from "@vue/reactivity";

import CustomButton from "./CustomButton.vue";
import CustomCheckbox from "./CustomCheckbox.vue";
const labelsList = reactive([
  {
    id: "1",
    name: "label1",
    color: "#ff0000",
    isSelected: false,
  },
  {
    id: "2",
    name: "label2",
    color: "#00ff00",
    isSelected: false,
  },
  {
    id: "3",
    name: "label3",
    color: "#0000ff",
    isSelected: false,
  },
]);

const isModalOpen = ref(false);
const newLabelname = ref("");

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const addNewLabel = () => {
  labelsList.push({
    id: `${labelsList.length + 1}`,
    name: newLabelname.value,
    color: "#ff0000",
    isSelected: false,
  });

  newLabelname.value = "";
};

const selectedLables = computed(() => {
  return labelsList.filter((label) => label.isSelected);
});
</script>

<template>
  <div>
    <div
      v-for="selectedLabel in selectedLables"
      :key="selectedLabel.id"
      :style="{ borderTop: `2px solid ${selectedLabel.color}` }"
    >
      {{ selectedLabel.name }}
    </div>
    <button @click="toggleModal">add label</button>
  </div>
  <div class="label-modal" v-if="isModalOpen">
    <CustomButton
      :isCloseButton="true"
      @click="toggleModal"
      class="close-button"
    />
    <div v-for="label in labelsList" :key="label.id" class="label-item">
      <CustomCheckbox v-model="label.isSelected" />
      <input type="color" v-model="label.color" />
      <span @click="label.isSelected = !label.isSelected">{{
        label.name
      }}</span>
    </div>
    <input v-model="newLabelname" />
    <button @click="addNewLabel">Add new label</button>
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
