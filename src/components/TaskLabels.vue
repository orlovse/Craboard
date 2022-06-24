<script setup lang="ts">
import { useBoardsStore, type LabelType } from "@/stores/boards";
import { computed } from "@vue/reactivity";
import { storeToRefs } from "pinia";

const boardStore = useBoardsStore();
const { selectedLabels } = storeToRefs(boardStore);

const isShowLabels = computed(() => {
  return selectedLabels.value.length;
});

const onLabelClick = (label: LabelType) => {
  label.isSelected = !label.isSelected;
};
</script>

<template>
  <div v-if="isShowLabels" class="task-labels">
    <span>{{ $t("selectLabels") }}:</span>
    <TransitionGroup name="list" tag="div" class="label-wrapper">
      <div
        v-for="label in selectedLabels"
        @click="onLabelClick(label)"
        :key="label.id"
        :style="{ borderTop: `2px solid ${label.color}` }"
        class="label-item"
      >
        <span class="label-text"> {{ label.name }}</span>
        <span class="remove-text">{{ $t("delete") }}?</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">
.task-labels {
}

.label-wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.label-item {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 2px;
  margin: 10px;
  cursor: pointer;
  overflow: hidden;
  transition: 0.2s;
  min-width: 60px;

  &:hover {
    .label-text {
      transform: translateY(-100%);
    }

    .remove-text {
      transform: translate(-50%, 0);
    }
  }
}

.label-text {
  display: inline-block;
  transition: 0.2s;
}

.remove-text {
  display: inline-block;
  transform: translate(-50%, 100%);
  position: absolute;
  transition: 0.2s;
  left: 50%;
  top: 0;
}
</style>
