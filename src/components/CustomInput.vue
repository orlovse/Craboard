<script setup lang="ts">
interface IProps {
  isShowButton?: boolean;
  isBlurOnEnter?: boolean;
  label?: string;
  modelValue?: string;
  placeholder?: string;
  type?: string;
}

const emit = defineEmits(["update:modelValue", "onButtonClick"]);

const props = withDefaults(defineProps<IProps>(), {
  type: "text",
});

const onInput = (event: Event) => {
  const target = event?.target as HTMLInputElement;
  const value = target?.value;

  emit("update:modelValue", value);
};

const handleEnter = (event: KeyboardEvent) => {
  const target = event.target as HTMLInputElement;
  if (props.isBlurOnEnter) {
    target.blur();
  }

  emit("onButtonClick", target.value);
};
</script>

<template>
  <div class="input-wrapper">
    <input
      :placeholder="placeholder"
      :type="type"
      :value="modelValue"
      @input="onInput"
      @keyup.enter="handleEnter"
      :class="{ 'button-padding': isShowButton }"
      class="custom-input"
    />
    <button
      class="input-button"
      v-if="isShowButton"
      @click="emit('onButtonClick', modelValue)"
    >
      <span class="button-icon">+</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
}

.custom-input {
  background-color: var(--color-background-main);
  border-radius: 40px;
  border: 1px solid #349bf052;
  color: var(--color-text);
  height: 40px;
  outline: none;
  overflow: hidden;
  padding: 5px 16px;
  transition: 0.5s;
  width: 100%;

  &:focus {
    border: 1px solid #349af0;
    box-shadow: 1px 1px 6px -1px #349af0, -1px -1px 6px -1px #349af0;
  }
}

.input-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1e90ff;
  border-radius: 100%;
  border: 0;
  cursor: pointer;
  height: 32px;
  position: absolute;
  right: 4px;
  top: 4px;
  transition: 0.3s;
  width: 32px;

  [dir="rtl"] & {
    left: 4px;
    right: unset;
  }

  &:hover {
    background-color: #0fb9b1;
  }

  .button-icon {
    color: var(--color-text-opposite);
    font-size: 30px;
  }
}

.button-padding {
  padding-inline-end: 40px;
}
</style>
