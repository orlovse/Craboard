<script setup lang="ts">
import { computed } from "@vue/reactivity";

interface IProps {
  totalCount: number;
  currentValue: number;
}

const props = defineProps<IProps>();

const percentage = computed(() => {
  if (props.totalCount === 0) {
    return props.totalCount;
  }

  return Math.round((props.currentValue / props.totalCount) * 100);
});
</script>

<template>
  <div class="progress-bar">
    <div class="progress-value" :style="{ width: `${percentage}%` }">
      <span :class="{ 'start-position': percentage < 10 }"
        >{{ percentage }}%</span
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.progress-bar {
  position: relative;
  padding: 2px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.25);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
    0 1px rgba(255, 255, 255, 0.08);
}

.progress-value {
  height: 18px;
  border-radius: 30px;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  background-color: #ef476f;
  transition: 0.4s linear;
  transition-property: width, background-color;
  display: flex;
  justify-content: center;
  align-items: center;
}

.start-position {
  position: absolute;
  left: 10px;
}
</style>
