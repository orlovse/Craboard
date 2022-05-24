<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const { isDarkTheme } = storeToRefs(userStore);
const { switchThemeAction } = userStore;
</script>

<template>
  <label class="dayNight" :class="[isDarkTheme && 'day']">
    <input type="checkbox" @change="switchThemeAction" />
    <div></div>
  </label>
</template>

<style scoped lang="scss">
$dayBtn: #eec328;

.dayNight {
  cursor: pointer;
  input {
    display: none;

    & + div {
      border-radius: 50%;
      box-shadow: inset 16px -16px 0 0 var(--color-primary);
      height: 36px;
      position: relative;
      transform: scale(1) rotate(-2deg);
      transition: box-shadow 0.5s ease 0s, transform 0.4s ease 0.1s;
      width: 36px;

      &:before {
        border-radius: inherit;
        content: "";
        height: inherit;
        left: 0;
        position: absolute;
        top: 0;
        transition: background 0.3s ease;
        width: inherit;
      }
      &:after {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin: -4px 0 0 -4px;
        position: absolute;
        top: 50%;
        left: 50%;
        box-shadow: 0 -23px 0 $dayBtn, 0 23px 0 $dayBtn, 23px 0 0 $dayBtn,
          -23px 0 0 $dayBtn, 15px 15px 0 $dayBtn, -15px 15px 0 $dayBtn,
          15px -15px 0 $dayBtn, -15px -15px 0 $dayBtn;
        transform: scale(0);
        transition: all 0.3s ease;
      }
    }
    &:checked + div {
      box-shadow: inset 32px -32px 0 0 var(--color-primary);
      transform: scale(0.5) rotate(0deg);
      transition: transform 0.3s ease 0.1s, box-shadow 0.2s ease 0s;

      &:before {
        background: $dayBtn;
        transition: background 0.3s ease 0.1s;
      }

      &:after {
        transform: scale(1.5);
        transition: transform 0.5s ease 0.15s;
      }
    }
  }
}
</style>
