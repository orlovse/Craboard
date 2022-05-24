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
  background: rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
    0 1px rgba(255, 255, 255, 0.08);
  padding: 2px;
  position: relative;
}

.progress-value {
  align-items: center;
  background-color: var(--color-primary);
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  border-radius: 30px;
  color: white;
  display: flex;
  height: 18px;
  justify-content: center;
  transition-property: width, background-color;
  transition: 0.4s linear;
}

.start-position {
  left: 10px;
  position: absolute;
}
</style>
