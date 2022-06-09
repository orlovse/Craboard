<script lang="ts" setup>
import type { CommentType } from "@/stores/boards";
import { ref } from "@vue/reactivity";

interface IProps {
  comment?: CommentType;
}

const props = defineProps<IProps>();
const emit = defineEmits(["onRemoveComment", "onEditComment"]);

const isEdit = ref(!props.comment);

const toggleEdit = () => {
  isEdit.value = !isEdit.value;
};
</script>

<template>
  <div>
    <span>{{ comment?.user.name }}</span>
    <span>{{ comment?.dateCreated }}</span>
    <p>{{ comment?.text }}</p>
    <span @click="emit('onRemoveComment', comment?.id)">Remove</span>
    <span @click="emit('onEditComment')">Edit</span>
  </div>
</template>

<style lang="scss" scoped></style>
