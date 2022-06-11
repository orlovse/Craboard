<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { watch } from "vue";
import { Icon } from "@iconify/vue";

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
      <Icon v-if="isIcon" width="18" icon="uil:trash-alt" />
      <span v-else> {{ firstText }}</span>
    </span>
    <span class="text second-text" :class="{ 'clicked-second': isClicked }">
      <Icon width="18" v-if="isIcon" icon="uil:check" />
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
  color: var(--color-text-opposite);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transition: transform 0.2s;
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

  span,
  svg {
    transform: translateY(-5%);
  }
}
</style>
