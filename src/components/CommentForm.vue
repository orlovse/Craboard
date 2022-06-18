<script lang="ts" setup>
import { computed } from "vue";
import { ref } from "@vue/reactivity";

import { convertDate } from "@/utils/convertDate";
import type { CommentType } from "@/stores/boards";
import CustomTextarea from "./CustomTextarea.vue";
import ButtonWithConfirm from "./ButtonWithConfirm.vue";

interface IProps {
  comment?: CommentType;
}

const props = defineProps<IProps>();
const emit = defineEmits(["onRemoveComment", "onEditComment"]);

const isAuthor = computed(() => {
  return true;
});

const newCommentText = ref(props.comment?.text || "");

const updateComment = () => {
  emit("onEditComment", props.comment, newCommentText);
};
</script>

<template>
  <div class="comment-form">
    <div class="comment-header">
      <span class="username">
        {{ comment?.user.name }}
        <span class="date">{{ convertDate(comment?.dateCreated) }}</span>
      </span>
      <ButtonWithConfirm
        v-if="isAuthor"
        :isIcon="true"
        @onConfirm="emit('onRemoveComment', comment?.id)"
        class="remove-button"
      />
    </div>

    <p v-if="!isAuthor" class="comment-text">{{ comment?.text }}</p>
    <CustomTextarea
      v-else
      v-model="newCommentText"
      class="comment-text"
      @blur="updateComment"
    />
  </div>
</template>

<style lang="scss" scoped>
.comment-form {
  margin-bottom: 15px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-text {
  display: block;
  font-size: 16px;
  background-color: var(--color-elements);
  width: 100%;
  padding: 10px;
  border-radius: 10px;
}

.username {
  font-size: 16px;
  font-weight: bold;
}

.date {
  margin-inline-start: 5px;
  margin-bottom: 10px;
  font-size: 12px;
  color: #999;
}

.remove-button {
  margin-bottom: 10px;
}
</style>
