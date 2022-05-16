<script setup lang="ts">
import { watch } from "vue";
import { ref } from "@vue/reactivity";

interface IProps {
  firstText: string;
  secondText: string;
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
  <button class="button-with-confirm" @click="onClick" @keyup.enter="onClick">
    <span class="text first-text">{{ firstText }}</span>
    <span class="text second-text" :class="{ 'clicked-second': isClicked }">{{
      secondText
    }}</span>
  </button>
</template>

<style scoped lang="scss">
.button-with-confirm {
  width: 100px;
  height: 40px;
  overflow: hidden;
  padding: 0;
  position: relative;
  border-radius: var(--border-radius-card);
  color: var(--color);

  &:hover .second-text:not(.clicked-second) {
    transform: translateY(85%);
  }
}

.text {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s;
  color: white;
  font-size: 18px;
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
