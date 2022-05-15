<script setup lang="ts">
import type { InputTypes } from "@/types";

interface IProps {
  id: string;

  inputType?: InputTypes;
  label?: string;
  modelValue?: string;
  placeholder?: string;
  type?: string;
}

const emit = defineEmits(["update:modelValue", "onButtonClick"]);

withDefaults(defineProps<IProps>(), {
  type: "text",
});

const onInput = (event: Event) => {
  const target = event?.target as HTMLInputElement;
  const value = target?.value;

  emit("update:modelValue", value);
};
</script>

<template>
  <div class="input-wrapper">
    <input
      class="custom-input"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
    />
    <button
      class="input-button"
      v-if="inputType === 'withButton'"
      @click="emit('onButtonClick', modelValue)"
    >
      <i class="fas fa-paper-plane"></i>
    </button>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
}

.custom-input {
  color: var(--color-text);
  height: 40px;
  width: 100%;
  border-radius: 40px;
  overflow: hidden;
  background-color: var(--color-background-main);
  border: 1px solid #349bf052;
  padding: 5px 16px;
  outline: none;
  transition: 0.5s;

  &:focus {
    border: 1px solid #349af0;
    box-shadow: 1px 1px 6px -1px #349af0, -1px -1px 6px -1px #349af0;
  }
}

.input-button {
  position: absolute;
  right: 4px;
  top: 4px;
  cursor: pointer;
  border: 0;
  height: 32px;
  width: 32px;
  border-radius: 100%;
  background-color: #1e90ff;
  transition: 0.3s;

  &:hover {
    background-color: #0fb9b1;
  }

  i {
    color: #fefefe;
  }
}
</style>
