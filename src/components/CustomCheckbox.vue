<script setup lang="ts">
interface IProps {
  modelValue?: boolean;
}

const props = defineProps<IProps>();

const emit = defineEmits(["update:modelValue"]);

const setIsChecked = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>

<template>
  <div for="todo" class="checkbox">
    <input
      :class="{ checked: modelValue }"
      :value="modelValue"
      class="checkbox-input hidden"
      id="todo"
      type="checkbox"
    />
    <div for="todo" class="cbx" @click="setIsChecked">
      <svg width="14px" height="12px" viewBox="0 0 14 12">
        <polyline points="1 7.6 5 11 13 1"></polyline>
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
.checkbox {
  align-items: center;
  align-self: center;
  display: flex;
  padding: 8px;
  transform: translateZ(0);

  .cbx {
    border-radius: 3px;
    border: 1px solid #c8ccd4;
    cursor: pointer;
    display: inline-block;
    height: 14px;
    position: relative;
    top: 1px;
    width: 14px;

    svg {
      fill: none;
      position: relative;
      stroke-linecap: round;
      stroke-linejoin: round;
      top: -5px;
      transform: scale(0);

      polyline {
        stroke-width: 2;
        stroke: var(--color-primary);
      }
    }

    &:before {
      border-radius: 100%;
      content: "";
      height: 20px;
      left: 50%;
      margin: -10px 0 0 -10px;
      position: absolute;
      top: 50%;
      transform: scale(0);
      width: 20px;
    }

    &:after {
      border-radius: 2px;
      box-shadow: 0 -18px 0 var(--color-primary),
        12px -12px 0 var(--color-primary), 18px 0 0 var(--color-primary),
        12px 12px 0 var(--color-primary), 0 18px 0 var(--color-primary),
        -12px 12px 0 var(--color-primary), -18px 0 0 var(--color-primary),
        -12px -12px 0 var(--color-primary);
      content: "";
      height: 2px;
      left: 5px;
      position: absolute;
      top: 5px;
      transform: scale(0);
      width: 2px;
    }
  }

  .checkbox-input {
    display: none;

    &.checked {
      + .cbx {
        border-color: transparent;

        svg {
          transform: scale(1);
          transition: all 0.4s ease;
          transition-delay: 0.1s;
        }

        &:before {
          transform: scale(1);
          opacity: 0;
          transition: all 0.3s ease;
        }

        &:after {
          transform: scale(1);
          opacity: 0;
          transition: all 0.6s ease;
        }
      }
    }
  }
}
</style>
