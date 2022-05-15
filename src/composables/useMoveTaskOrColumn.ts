import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";

import type { TransferDataType } from "@/components/CustomDrag.vue";
import { useBoardsStore, type ColumnType } from "@/stores/boards";

type UseMoveTaskOrColumnType = {
  column?: ColumnType;
  columnIndex?: number;
  taskIndex?: number;
};

export const useMoveTaskOrColumn = (props: UseMoveTaskOrColumnType) => {
  const { column, columnIndex, taskIndex } = props;

  const boardStore = useBoardsStore();
  const route = useRoute();

  const { moveTaskAction, moveColumnAction, getBoardById } = boardStore;

  const boardId = computed(() => {
    return route.params.boardId as string;
  });

  const selectedBoard = getBoardById(boardId.value);

  const moveTaskOrColumn = (transferData: TransferDataType) => {
    const { type, fromColumnIndex, fromTaskIndex } = transferData;

    if (type === "column" && typeof columnIndex === "number") {
      moveColumnAction(fromColumnIndex, columnIndex);
    }

    if (type === "task" && column) {
      const fromTasks =
        (selectedBoard && selectedBoard[fromColumnIndex]?.tasks) || [];

      moveTaskAction(fromTasks, column, fromTaskIndex || 0, taskIndex || 0);
    }
  };

  return moveTaskOrColumn;
};
