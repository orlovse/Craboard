<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";

import { useBoardsStore } from "@/stores/boards";
import CustomInput from "@/components/CustomInput.vue";

const boardStory = useBoardsStore();

const { addNewBoardAction, getBoardsListAction } = boardStory;
const { boardsList } = storeToRefs(boardStory);

onMounted(() => {
  getBoardsListAction();
});

const newBoardName = ref("");

const addNewBoard = () => {
  addNewBoardAction(newBoardName.value);
  newBoardName.value = "";
};
</script>

<template>
  <main class="home-page">
    <div v-for="board in boardsList" :key="board.boardId">
      <RouterLink :to="`/board/${board.boardId}`">{{
        board.boardName
      }}</RouterLink>
    </div>
    <CustomInput
      placeholder="Add new board"
      v-model="newBoardName"
      :isShowButton="true"
      @onButtonClick="addNewBoard"
    />
  </main>
</template>

<style scoped lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  margin-top: 100px;
}
</style>
