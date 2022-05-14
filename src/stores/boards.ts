import router from "@/router";
import { defineStore } from "pinia";

const boardList = [
  {
    name: "todo",
    tasks: [
      {
        description: "test description",
        name: "first task",
        id: "1",
        userAssigned: null,
      },
      {
        description: "",
        name: "second task",
        id: "2",
        userAssigned: null,
      },
      {
        description: "",
        name: "and thrid",
        id: "3",
        userAssigned: null,
      },
    ],
  },
  {
    name: "in-progress",
    tasks: [
      {
        description: "",
        name: "first task",
        id: "4",
        userAssigned: null,
      },
    ],
  },
  {
    name: "done",
    tasks: [
      {
        description: "",
        name: "first task",
        id: "5",
        userAssigned: null,
      },
    ],
  },
];

export type TaskType = {
  description: string;
  name: string;
  id: string;
  userAssigned: null;
};

export type TaskKeyType = keyof TaskType;

export type ColumnType = {
  name: string;
  tasks: TaskType[];
};

export type BoardType = {
  boardName: string;
  boardContent: ColumnType[];
};

export type BoardsHashType = {
  [boardId: string]: BoardType;
};

export type BoardsStateType = {
  loading: boolean;
  boards: BoardsHashType | null;
};

export const useBoardsStore = defineStore({
  id: "boards",
  state: () =>
    ({
      boards: null,
      loading: false,
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
    getBoardsListAction() {
      return [
        { boadrId: "1111", boardName: "First Board" },
        { boadrId: "2222", boardName: "Second Board" },
        { boadrId: "3333", boardName: "Third Board" },
      ];
    },
    getBoardAction() {
      this.loading = true;

      const boardId = router.currentRoute.value.params.boardId as string;

      setTimeout(() => {
        this.boards = {
          ...this.boards,
          [boardId]: {
            boardName: "First Board",
            boardContent: boardList,
          },
        };

        this.loading = false;
      }, 1000);
    },
    createTaskAction(tasks: TaskType[], taskName: string) {
      //server should return id
      const id = Math.random().toString(16).slice(2);
      tasks.push({
        id,
        name: taskName,
        description: "",
        userAssigned: null,
      });
    },
    createColumnAction(name: string) {
      //server should return id and after that need to store new column
      const boardId = router.currentRoute.value.params.boardId as string;

      this.getBoardById(boardId)?.push({
        name,
        tasks: [],
      });
    },
    updateTaskAction(task: TaskType, key: TaskKeyType, value: string) {
      task[key] = value;
    },
    removeTaskAction(taskId: string, taskColumn: ColumnType | null) {
      if (taskColumn) {
        router.go(-1);
        taskColumn.tasks = taskColumn.tasks.filter((task) => {
          return task.id !== taskId;
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
