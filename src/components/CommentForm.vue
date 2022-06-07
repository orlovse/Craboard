<script lang="ts" setup>
import { ref } from "@vue/reactivity";

type CommentType = {
  text: string;
  author: {
    id: string;
    name: string;
    avatar: null;
  };
  created: string;
};

interface IProps {
  comment?: CommentType;
}

const props = defineProps<IProps>();

const isEdit = ref(!props.comment);

const toggleEdit = () => {
  isEdit.value = !isEdit.value;
};
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
