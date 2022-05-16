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
    <span class="text second-text">{{ secondText }}</span>
    <span class="text first-text" :class="{ clicked: isClicked }">{{
      firstText
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
}

.text {
  background: azure;
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  color: var(--color-text-opposite);
  font-size: 18px;
}

.clicked {
  transform: translateY(-90%);
}

.first-text {
  background-color: var(--color-error);
}

.second-text {
  background-color: var(--color-primary);
}
</style>
