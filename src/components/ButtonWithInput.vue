<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { watch } from "vue";

import CustomButton from "./CustomButton.vue";
import CustomInput from "./CustomInput.vue";

interface IProps {
  buttonText: string;
  confirmButtontext: string;
  isDisabled: boolean;
  modelValue: string;

  placeholder?: string;
}

const props = defineProps<IProps>();
const emit = defineEmits(["update:modelValue", "addChecklist"]);

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

const closeInput = () => {
  if (isShowInput.value) {
    isShowInput.value = false;
    inputValue.value = "";
  }
};

const switchAndSend = () => {
  if (isShowInput.value) {
    emit("update:modelValue", inputValue.value);
    emit("addChecklist");
  }

  switchInput();
};
</script>

<template>
  <div class="button-with-input">
    <CustomButton
      :isDefault="true"
      :isDisabled="isDisabled"
      :text="isShowInput ? confirmButtontext : buttonText"
      @click.stop="switchAndSend"
      class="button"
    />
    <CustomButton
      :class="{ 'show-confirm-button': isShowInput }"
      :isDefault="true"
      @click.stop="switchInput"
      class="confirm-button"
      text="X"
    />
    <CustomInput
      :class="{ 'show-input': isShowInput }"
      :isBlurOnEnter="true"
      :placeholder="placeholder"
      @keypress.enter="switchInput"
      class="input"
      v-click-outside="closeInput"
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
  height: 40px;
  width: 120px;
  z-index: 2;
}

.confirm-button {
  height: 40px;
  width: 48px;
  position: absolute;
  right: 20px;
  z-index: 1;
  border-radius: 0 50px 50px 0;
  background-color: var(--color-error);
  padding-inline-start: 10px;
}

.input {
  position: absolute;
  right: 0;
  transition: 0.5s;
  width: 120px;
}

.show-confirm-button {
  right: -30px;
}

.show-input {
  width: 300px;
}
</style>
