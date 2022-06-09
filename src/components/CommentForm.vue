<script lang="ts" setup>
import { computed } from "vue";
import { ref } from "@vue/reactivity";

import type { CommentType } from "@/stores/boards";

interface IProps {
  comment?: CommentType;
}

const props = defineProps<IProps>();
const emit = defineEmits(["onRemoveComment", "onEditComment"]);

const isEdit = ref(!props.comment);

const isAuthor = computed(() => {
  return true;
});

const toggleEdit = () => {
  isEdit.value = !isEdit.value;
};
</script>

<template>
  <div>
    <span>{{ comment?.user.name }}</span>
    <span>{{ comment?.dateCreated }}</span>
    <p>{{ comment?.text }}</p>
    <div v-if="isAuthor" class="buttons">
      <span @click="emit('onRemoveComment', comment?.id)">Remove</span>
      <span @click="emit('onEditComment')">Edit</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.buttons {

}
</style>
