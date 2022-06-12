<script lang="ts" setup>
import { computed } from "vue";
import { ref } from "@vue/reactivity";

import type { CommentType } from "@/stores/boards";
import CustomTextarea from "./CustomTextarea.vue";

interface IProps {
  comment?: CommentType;
}

const props = defineProps<IProps>();
const emit = defineEmits(["onRemoveComment", "onEditComment"]);

const isEdit = ref(false);

const isAuthor = computed(() => {
  return true;
});

const toggleEdit = () => {
  isEdit.value = !isEdit.value;
};

const newCommentText = ref(props.comment?.text || "");

const updateComment = () => {
  emit("onEditComment", props.comment, newCommentText);
};
</script>

<template>
  <div>
    <span>{{ comment?.user.name }}</span>
    <span>{{ comment?.dateCreated }}</span>
    <p v-if="!isAuthor">{{ comment?.text }}</p>
    <CustomTextarea
      v-else
      v-model="newCommentText"
      class="comment-textarea"
      @blur="updateComment"
    />
    <div v-if="isAuthor" class="buttons">
      <span @click="emit('onRemoveComment', comment?.id)">Remove</span>
      <span @click="emit('onEditComment', comment, newCommentText)">Edit</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.buttons {
}

.comment-textarea {
  display: block;
  font-size: 16px;
}
</style>
