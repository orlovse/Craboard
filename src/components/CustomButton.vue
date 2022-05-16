<script setup lang="ts">
interface IProps {
  isIconButton?: boolean;
  isCloseButton?: boolean;
  text?: string;
}

defineProps<IProps>();
</script>

<template>
  <button
    class="custom-button"
    :class="{ 'icon-button': isIconButton, 'close-button': isCloseButton }"
  >
    {{ text }}
  </button>
</template>

<style scoped lang="scss">
.custom-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  display: inline-block;
  border: none;
  text-decoration: none;
  cursor: pointer;
}

.icon-button {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: var(--color-primary);
}

.close-button {
  width: 30px;
  height: 30px;
  background: transparent;
  border-radius: 50%;
  position: relative;
  display: inline-block;
  transition: 0.2s cubic-bezier(0.175, 0.885, 0.52, 1.775);

  &:after {
    width: 24px;
    height: 2px;
    background-color: var(--color-error);
    content: "";
    left: 50%;
    top: 50%;
    margin-left: -12px;
    margin-top: -2px;
    position: absolute;
    transform: rotate(-45deg);
  }
  &:before {
    left: 50%;
    top: 50%;
    margin-left: -12px;
    margin-top: -2px;
    width: 24px;
    height: 2px;
    background-color: var(--color-error);
    content: "";
    position: absolute;
    transform: rotate(45deg);
  }

  &:before,
  &:after {
    transition: 200ms cubic-bezier(0.175, 0.885, 0.52, 1.775);
  }

  &:hover {
    box-shadow: 0px 0px 0px 0px var(--color-error) inset;
    border: 2px solid var(--color-error);
    &:before {
      transform: scale(0.7) rotate(45deg);
      transition-delay: 0.1s;
    }
    &:after {
      transform: scale(0.7) rotate(-45deg);
      transition-delay: 0.1s;
    }
  }
}
</style>
