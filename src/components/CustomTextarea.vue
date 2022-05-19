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
    class="custom-textarea"
    :value="modelValue"
    :placeholder="placeholder"
    @keypress.prevent.enter="setValue($event, false)"
    @focusout="setValue($event, false)"
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
