<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";

type DropdownItemType = {
  label: string;
  value: string;
};

interface IProps {
  dropdownList: DropdownItemType[];
  selectedValue: string;
}

const props = defineProps<IProps>();
const emit = defineEmits(["onSelectItem"]);

const filteredList = computed(() => {
  return props.dropdownList.filter(
    (item) => item.value !== props.selectedValue
  );
});

const isDropdownOpened = ref(false);

const switchDropdown = () => {
  isDropdownOpened.value = !isDropdownOpened.value;
};

const closeModal = () => {
  isDropdownOpened.value = false;
};

const onItemClick = (newValue: string) => {
  closeModal();
  emit("onSelectItem", newValue);
};
</script>

<template>
  <div class="custom-dropdown">
    <button
      @click="switchDropdown"
      class="dropdown-button"
      v-click-outside="closeModal"
    >
      {{ selectedValue }}
    </button>
    <Transition>
      <ul v-if="isDropdownOpened" class="dropdown-container">
        <li
          v-for="item in filteredList"
          class="dropdown-item"
          tabindex="0"
          :key="item.value"
          @click="onItemClick(item.value)"
          @keyup.enter="onItemClick(item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.custom-dropdown {
  position: relative;
}
.dropdown-container {
  background-color: var(--color-background-main);
  border-radius: var(--border-radius-card);
  box-shadow: var(--color-shadow-active);
  overflow: hidden;
  padding: 10px 0;
  position: absolute;
  z-index: 20;
  right: 0;
  width: max-content;

  [dir="rtl"] & {
    left: 0;
    right: unset;
  }
}

.dropdown-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-primary);
  border-radius: 100%;
  color: var(--color-text-opposite);
  font-weight: 600;
  padding: 10px;
  text-transform: uppercase;
  width: 25px;
  height: 25px;
}

.dropdown-item {
  cursor: pointer;
  padding: 8px 15px;

  &:hover {
    background-color: var(--color-elements);
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
  transform: translateY(0);
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
