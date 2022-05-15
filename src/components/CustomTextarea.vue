<script setup lang="ts">
import { ref } from "@vue/reactivity";

interface IProps {
  modelValue: string;
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
    @keyup.enter="setFocused($event, false)"
    @focusin="setFocused($event, true)"
    @focusout="setFocused($event, false)"
  />
</template>

<style scoped lang="scss">
.custom-textarea {
  border: none;
  outline: none;
  resize: none;

  &:focus {
    border: 1px solid blue;
    resize: vertical;
  }
}
</style>
