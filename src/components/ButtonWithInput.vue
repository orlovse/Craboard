<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { watch } from "vue";

import CustomButton from "./CustomButton.vue";
import CustomInput from "./CustomInput.vue";

interface IProps {
  buttonText: string;
  modelValue: string;

  placeholder?: string;
}

const props = defineProps<IProps>();
const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue);

const isShowInput = ref(false);

watch(inputValue, (newValue) => {
  if (newValue) {
    emit("update:modelValue", newValue);
  }
});

const switchInput = () => {
  isShowInput.value = !isShowInput.value;
  inputValue.value = "";
};
</script>

<template>
  <div class="button-with-input">
    <CustomButton class="button" :text="buttonText" @click="switchInput" />
    <CustomInput
      :class="{ 'show-input': isShowInput }"
      :isBlurOnEnter="true"
      :placeholder="placeholder"
      @keypress.enter="switchInput"
      class="input"
      v-model="inputValue"
    />
  </div>
</template>

<style scoped lang="scss">
.button-with-input {
  align-items: center;
  border-radius: 50px;
  display: flex;
  height: 50px;
  justify-content: end;
  position: relative;
}

.button {
  background-color: var(--color-primary);
  border-radius: 50px;
  color: var(--color-text-opposite);
  height: 40px;
  width: 120px;
  z-index: 2;
}

.input {
  position: absolute;
  right: 0;
  transition: 0.5s;
  width: 120px;
  z-index: 1;
}

.show-input {
  width: 300px;
}
</style>
