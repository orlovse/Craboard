<script setup lang="ts">
import { Icon } from "@iconify/vue";

interface IProps {
  isDisabled?: boolean;
  isDefault?: boolean;
  isIconButton?: boolean;
  isCloseButton?: boolean;
  icon?: string;
  text?: string;
}

defineProps<IProps>();
</script>

<template>
  <button
    class="custom-button"
    :class="{
      'close-button': isCloseButton,
      'default-button': isDefault,
      'disabled-button': isDisabled,
      'icon-button': isIconButton,
    }"
    :disabled="isDisabled"
  >
    <slot></slot>
    <!-- <div class="button-background"></div> -->
    <Icon v-if="isIconButton" :icon="icon" width="18" class="icon" />
    <template v-else>
      <span class="button-text first"> {{ text }}</span>
      <span class="button-text second"> {{ text }}</span>
    </template>
  </button>
</template>

<style scoped lang="scss">
.custom-button {
  border: var(--border-radius-card);
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  .button-text {
    display: inline-block;
    transition: 0.3s;
    transform: translateY(50%);
  }

  .second {
    display: none;
  }

  &.disabled-button {
    background-color: grey;

    &:hover {
      cursor: default;
    }
  }
}

.default-button {
  transition: 0.5s;
  border-radius: 50px;
  background-color: var(--color-primary);
  color: white;

  .second {
    display: block;
    transform: translateY(200%);
  }

  &:hover:not(.disabled-button) {
    .first {
      transform: translateY(-200%);
    }

    .second {
      transform: translateY(-50%);
    }
  }
}

.icon-button {
  background-color: var(--color-primary);
  border-radius: 100%;
  height: 25px;
  width: 25px;
}

.icon {
  color: var(--color-text-opposite);
}

.close-button {
  background: transparent;
  border-radius: 50%;
  display: inline-block;
  height: 30px;
  position: relative;
  transition: 0.2s cubic-bezier(0.175, 0.885, 0.52, 1.775);
  width: 30px;

  &:after {
    background-color: var(--color-error);
    content: "";
    height: 2px;
    left: 50%;
    margin-left: -12px;
    margin-top: -2px;
    position: absolute;
    top: 50%;
    transform: rotate(-45deg);
    width: 24px;
  }

  &:before {
    background-color: var(--color-error);
    content: "";
    height: 2px;
    left: 50%;
    margin-left: -12px;
    margin-top: -2px;
    position: absolute;
    top: 50%;
    transform: rotate(45deg);
    width: 24px;
  }

  &:before,
  &:after {
    transition: 200ms cubic-bezier(0.175, 0.885, 0.52, 1.775);
  }

  &:hover {
    border: 2px solid var(--color-error);
    box-shadow: 0px 0px 0px 0px var(--color-error) inset;

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
