<script setup lang="ts">
import { onMounted, ref } from "vue";

interface IProps {
  modelValue: string;

  isAutofocus?: boolean;
  isTitle?: boolean;
  placeholder?: string;
}

const props = defineProps<IProps>();
const emit = defineEmits(["update:modelValue", "onBlur"]);

const textarea = ref<HTMLTextAreaElement | null>(null);

const onEnterPress = (event: KeyboardEvent) => {
  if (props.isTitle) {
    event.preventDefault();
    setValue(event, false);
    emit("onBlur");
  } else {
    changeTextareaHeight();
  }
};

const changeTextareaHeight = () => {
  if (textarea.value) {
    textarea.value.style.height = "auto";
    textarea.value.style.height = textarea.value?.scrollHeight + "px";
  }
};

onMounted(() => {
  changeTextareaHeight();

  if (props.isAutofocus && textarea.value) {
    textarea.value.focus();
  }
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

const onBlur = (event: FocusEvent) => {
  setValue(event, false);
  emit("onBlur");
};
</script>

<template>
  <textarea
    :placeholder="placeholder"
    :value="modelValue"
    @blur="onBlur"
    @keyup.enter="onEnterPress"
    @keyup="changeTextareaHeight"
    class="custom-textarea"
    ref="textarea"
    rows="1"
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
  padding: 10px;

  &:focus {
    background-color: var(--color-elements);
    border-color: var(--color-primary);
    resize: vertical;
  }
}
</style>
