<script setup lang="ts">
import CustomTextarea from "./CustomTextarea.vue";

interface IProps {
  modelValue: boolean;
  label: string;
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
      type="checkbox"
      id="todo"
      class="checkbox-input hidden"
      :class="{ checked: modelValue }"
      :value="modelValue"
    />
    <div for="todo" class="cbx" @click="setIsChecked">
      <svg width="14px" height="12px" viewBox="0 0 14 12">
        <polyline points="1 7.6 5 11 13 1"></polyline>
      </svg>
    </div>
    <!-- <CustomTextarea :isTitle="true" v-model="" /> -->
    <div for="todo" class="cbx-lbl">{{ label }}</div>
  </div>
</template>

<style scoped lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  align-self: center;
  margin-bottom: 15px;
  //no-flicker Safari
  transform: translateZ(0);

  .cbx {
    position: relative;
    top: 1px;
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-inline-end: 10px;
    border: 1px solid #c8ccd4;
    border-radius: 3px;
    cursor: pointer;

    svg {
      position: relative;
      top: -5px;
      transform: scale(0);
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;

      polyline {
        stroke-width: 2;
        stroke: var(--color-primary);
      }
    }

    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -10px 0 0 -10px;
      width: 20px;
      height: 20px;
      border-radius: 100%;
      // background: $main
      transform: scale(0);
    }

    &:after {
      content: "";
      position: absolute;
      top: 5px;
      left: 5px;
      width: 2px;
      height: 2px;
      border-radius: 2px;
      box-shadow: 0 -18px 0 var(--color-primary),
        12px -12px 0 var(--color-primary), 18px 0 0 var(--color-primary),
        12px 12px 0 var(--color-primary), 0 18px 0 var(--color-primary),
        -12px 12px 0 var(--color-primary), -18px 0 0 var(--color-primary),
        -12px -12px 0 var(--color-primary);
      transform: scale(0);
    }
  }

  .cbx-lbl {
    position: relative;
    cursor: pointer;
    transition: color 0.3s ease;

    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      width: 0;
      height: 1px;
      background: #9098a9;
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

      ~ .cbx-lbl {
        color: #9098a9;
        &:after {
          width: 100%;
          transition: all 0.4s ease;
        }
      }
    }
  }
}
</style>
