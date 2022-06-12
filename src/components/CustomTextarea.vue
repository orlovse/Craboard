<script setup lang="ts">
import { onMounted, ref } from "vue";

interface IProps {
  modelValue: string;

  isTitle?: boolean;
  placeholder?: string;
}

const props = defineProps<IProps>();
const emit = defineEmits(["update:modelValue"]);

const textarea = ref<HTMLTextAreaElement | null>(null);

const onEnterPress = (event: KeyboardEvent) => {
  if (props.isTitle) {
    event.preventDefault();
    setValue(event, false);
  } else {
    changeTextareaHeight();
  }
};

const changeTextareaHeight = () => {
  if (textarea.value) {
    textarea.value.style.height = textarea.value?.scrollHeight + "px";
  }
};

onMounted(() => {
  changeTextareaHeight();
});

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
    @keyup.enter="onEnterPress"
    @keyup.delete="changeTextareaHeight"
    class="custom-textarea"
    ref="textarea"
  />
</template>

<style scoped lang="scss">
.custom-textarea {
  background-color: transparent;
  border: 1px solid transparent;
  color: var(--color-text);
  font-family: inherit;
  height: auto;
  outline: none;
  resize: none;
  overflow: hidden;

  &:focus {
    background-color: var(--color-elements);
    border-color: var(--color-primary);
    resize: vertical;
  }
}
</style>
