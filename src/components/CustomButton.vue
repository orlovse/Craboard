<script setup lang="ts">
interface IProps {
  isDefault?: boolean;
  isIconButton?: boolean;
  isCloseButton?: boolean;
  text?: string;
}

defineProps<IProps>();
</script>

<template>
  <button
    class="custom-button"
    :class="{
      'default-button': isDefault,
      'icon-button': isIconButton,
      'close-button': isCloseButton,
    }"
  >
    <!-- <div class="button-background"></div> -->
    <span class="button-text first"> {{ text }}</span>
    <span class="button-text second"> {{ text }}</span>
  </button>
</template>

<style scoped lang="scss">
.custom-button {
  border: var(--border-radius-card);
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

  .button-text {
    display: inline-block;
    transition: 0.3s;
    transform: translateY(50%);
  }

  .second {
    display: none;
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

  &:hover {
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
  height: 20px;
  width: 20px;
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
