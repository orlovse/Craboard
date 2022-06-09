<script setup lang="ts">
import checkIcon from "@/assets/svg/check.svg";
import trashIcon from "@/assets/svg/trash.svg";
import { ref } from "@vue/reactivity";
import { watch } from "vue";

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
    :class="{ 'button-icon': isIcon }"
    @click.stop="onClick"
    @keyup.enter="onClick"
    class="button-with-confirm"
  >
    <span class="text first-text">
      <img class="first-image" color="white" v-if="isIcon" :src="trashIcon" />
      <span v-else> {{ firstText }}</span>
    </span>
    <span class="text second-text" :class="{ 'clicked-second': isClicked }">
      <img class="first-image" v-if="isIcon" :src="checkIcon" />
      <span v-else> {{ secondText }}</span>
    </span>
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

.first-image {
  width: 14px;
  height: 14px;
  color: white;

  path {
    fill: white;
  }
}
</style>
