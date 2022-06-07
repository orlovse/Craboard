<script setup lang="ts">
import { watch } from "vue";
import { ref } from "@vue/reactivity";

interface IProps {
  firstText: string;
  secondText: string;

  isIcon?: boolean;
}

defineProps<IProps>();
const emit = defineEmits(["onConfirm"]);

let isClicked = ref<boolean>(false);

const onClick = () => {
  if (isClicked.value) {
    emit("onConfirm");
  } else {
    isClicked.value = true;
  }
};

watch(isClicked, (value) => {
  if (value) {
    setTimeout(() => {
      isClicked.value = false;
    }, 2000);
  }
});
</script>

<template>
  <button
    class="button-with-confirm"
    :class="{ 'button-icon': isIcon }"
    @click.stop="onClick"
    @keyup.enter="onClick"
  >
    <span class="text first-text">{{ firstText }}</span>
    <span class="text second-text" :class="{ 'clicked-second': isClicked }">{{
      secondText
    }}</span>
  </button>
</template>

<style scoped lang="scss">
.button-with-confirm {
  border-radius: 50px;
  color: var(--color);
  height: 40px;
  overflow: hidden;
  padding: 0;
  position: relative;
  width: 100px;

  &.button-icon {
    min-width: 25px;
    width: 25px;
    height: 25px;

    .text {
      font-size: 14px;
    }
  }

  &:hover .second-text:not(.clicked-second) {
    transform: translateY(85%);
  }
}

.text {
  align-items: center;
  color: white;
  display: block;
  display: flex;
  font-size: 18px;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  transition: transform 0.2s;
  width: 100%;
}

.first-text {
  background-color: var(--color-error);
}

.second-text {
  transform: translateY(100%);
  background-color: var(--color-primary);
}

.clicked-second {
  transform: translateY(5%);
}
</style>
