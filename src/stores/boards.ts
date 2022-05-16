import {
  createColumn,
  createTask,
  getBoard,
  getBoardsList,
  removeTask,
  updateTask,
} from "@/api/boards";
import router from "@/router";
import { defineStore } from "pinia";

export type TaskChecklistType = {
  checklistName: string;
  list: CheckItemType[];
};

export type CheckItemType = {
  id: string;
  isChecked: boolean;
  name: string;
  usersAssigned: null;
};

export type TaskType = {
  description: string;
  name: string;
  id: string;
  userAssigned: null;
  createdDate: string | null;
  changedDate: string | null;
  checklist: TaskChecklistType | null;
};

export type TaskKeyType = keyof TaskType;

export type ColumnType = {
  name: string;
  tasks: TaskType[];
};

export type BoardType = {
  boardId: string;
  boardName: string;
  boardContent: ColumnType[];
};

export type BoardsHashType = {
  [boardId: string]: BoardType;
};

export type BoardsStateType = {
  loading: boolean;
  boardLoading: boolean;
  boards: BoardsHashType;
  boardsList: BoardsListType;
  boardImage: string;
};

export type BoardsListType = { boardId: string; boardName: string }[];

export const useBoardsStore = defineStore({
  id: "boards",
  state: () =>
    ({
      boards: {},
      boardsList: [],
      loading: false,
      boardLoading: false,
      boardImage: "",
    } as BoardsStateType),
  getters: {
    getBoardById: (state) => {
      return (boardId: string) => {
        const { boards } = state;

        if (boards) {
          return boards[boardId]?.boardContent;
        }
      };
    },
  },
  actions: {
    setBoardImage(imageLink: string) {
      console.log("imageLink", imageLink);

      this.boardImage = imageLink;
    },
    getBoardsListAction() {
      this.loading = true;

      getBoardsList()
        .then((response) => {
          this.boardsList = response;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          console.error(error);
        });
    },
    getBoardAction() {
      this.boardLoading = true;

      const boardId = router.currentRoute.value.params.boardId as string;

      getBoard(boardId)
        .then((response) => {
          this.boards[boardId] = response;
          this.boardLoading = false;
        })
        .catch((error) => {
          this.boardLoading = false;
        });
    },
    createTaskAction(tasks: TaskType[], taskName: string) {
      this.loading = true;
      createTask("1", "2", { name: taskName, description: "" })
        .then((response) => {
          this.loading = false;
          tasks.push(response);
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    createColumnAction(name: string) {
      this.loading = true;

      const boardId = router.currentRoute.value.params.boardId as string;

      createColumn(boardId, name)
        .then((response) => {
          this.loading = false;

          this.getBoardById(boardId)?.push({
            name,
            tasks: [],
          });
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    updateTaskAction(task: TaskType, key: TaskKeyType, value: string) {
      this.loading = true;
      const boardId = router.currentRoute.value.params.boardId as string;
      updateTask(boardId, "2", task)
        .then((response) => {
          this.loading = false;
          task[key] = value;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    removeTaskAction(taskId: string, taskColumn: ColumnType | null) {
      if (taskColumn) {
        this.loading = true;
        removeTask("1", "2", taskId)
          .then(() => {
            this.loading = false;
            router.go(-1);
            taskColumn.tasks = taskColumn.tasks.filter((task) => {
              return task.id !== taskId;
            });
          })
          .catch((error) => {
            this.loading = false;
          });
      }
    },
    moveTaskAction(
      fromTasks: TaskType[],
      toColumn: ColumnType,
      fromTaskIndex: number,
      toTaskIndex: number
    ) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0];

      toColumn.tasks.splice(toTaskIndex, 0, taskToMove);
    },
    moveColumnAction(fromColumnIndex: number, toColumnIndex: number) {
      const boardId = router.currentRoute.value.params.boardId as string;

      const columnList = this.getBoardById(boardId);
      const columnToMove = columnList?.splice(fromColumnIndex, 1)[0];

      if (columnToMove) {
        columnList?.splice(toColumnIndex, 0, columnToMove);
      }
    },
  },
});
