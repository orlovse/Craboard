<script setup lang="ts">
interface IProps {
  modelValue: string;

  isTitle?: boolean;
  placeholder?: string;
}

const props = defineProps<IProps>();
const emit = defineEmits(["update:modelValue"]);

const setValue = (event: KeyboardEvent | FocusEvent, newValue: boolean) => {
  const target = event.target as HTMLTextAreaElement;

  if (props.isTitle) {
    target.blur();
  }

  if (!newValue) {
    const value = target?.value;

    emit("update:modelValue", value);
  }
};
</script>

<template>
  <textarea
    :placeholder="placeholder"
    :value="modelValue"
    @focusout="setValue($event, false)"
    @keypress.prevent.enter="setValue($event, false)"
    class="custom-textarea"
  />
</template>

<style scoped lang="scss">
.custom-textarea {
  background-color: transparent;
  border: 1px solid transparent;
  color: var(--color-text);
  font-family: inherit;
  outline: none;
  resize: none;

  &:focus {
    background-color: var(--color-elements);
    border-color: var(--color-primary);
    resize: vertical;
  }
}
</style>
