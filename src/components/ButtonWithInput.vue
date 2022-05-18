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
      :isBlurOnEnter="true"
      :placeholder="placeholder"
      v-model="inputValue"
      @keypress.enter="switchInput"
      class="input"
      :class="{ 'show-input': isShowInput }"
    />
  </div>
</template>

<style scoped lang="scss">
.button-with-input {
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: end;
  border-radius: 50px;
  height: 50px;
  align-items: center;
}

.button {
  z-index: 2;
  width: 120px;
  background-color: var(--color-primary);
  height: 40px;
  border-radius: 50px;
  color: var(--color-text-opposite);
}

.input {
  width: 120px;
  z-index: 1;
  transition: 0.5s;
  position: absolute;
  right: 0;
}

.show-input {
  width: 300px;
}
</style>
