<script setup lang="ts">
import { ref } from "@vue/reactivity";

interface IProps {
  modelValue: string;

  placeholder?: string;
}

defineProps<IProps>();
const emit = defineEmits(["update:modelValue"]);

const isFocused = ref(false);

const setFocused = (event: KeyboardEvent | FocusEvent, newValue: boolean) => {
  isFocused.value = newValue;

  if (!newValue) {
    const target = event?.target as HTMLTextAreaElement;
    const value = target?.value;

    emit("update:modelValue", value);
  }
};
</script>

<template>
  <textarea
    class="custom-textarea"
    :value="modelValue"
    :placeholder="placeholder"
    @keyup.enter="setFocused($event, false)"
    @focusin="setFocused($event, true)"
    @focusout="setFocused($event, false)"
  />
</template>

<style scoped lang="scss">
.custom-textarea {
  border: 1px solid transparent;
  outline: none;
  resize: none;
  background-color: transparent;
  color: var(--color-text);

  &:focus {
    border-color: var(--color-primary);
    background-color: var(--color-elements);
    resize: vertical;
  }
}
</style>
