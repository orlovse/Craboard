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

export type Task = {
  description: string;
  name: string;
  id: string;
  userAssigned: null;
};

type Column = {
  name: string;
  tasks: Task[];
};

export type BoardsState = {
  loading: false;
  boards:
    | {
        boardId: string;
        boardName: string;
        boardContent: Column[];
      }[]
    | null;
};

export const useBoardsStore = defineStore({
  id: "boards",
  state: () =>
    ({
      boards: [
        {
          boardId: "12345",
          boardName: "first",
          boardContent: boardList,
        },
      ],
    } as BoardsState),
  getters: {
    getBoardByName: (state) => {
      return (boardName: string) => {
        const { boards } = state;

        if (boards) {
          const selectedBoard = boards.find((board) => {
            return board.boardName === boardName;
          });

          return selectedBoard?.boardContent;
        }
      };
    },
  },
  actions: {
    getBoards() {
      // this.boards = [
      //   {
      //     boardId: "12345",
      //     boardName: "first",
      //     boardContent: boardList,
      //   },
      // ];
    },
    createTask(tasks: Task[], taskName: string) {
      const id = Math.random().toString(16).slice(2);
      tasks.push({
        id,
        name: taskName,
        description: "",
        userAssigned: null,
      });
    },
    updateTask(tasks: Task[], task: Task) {
      // task[key] = value;
    },
    moveTask(
      fromTasks: Task[],
      toTasks: Task[],
      fromTaskIndex: number,
      toTaskIndex: number
    ) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0];
      toTasks.splice(toTaskIndex, 0, taskToMove);
    },
    moveColumn(fromColumnIndex: number, toColumnIndex: number) {
      const columnList = this.getBoardByName("first");
      const columnToMove = columnList?.splice(fromColumnIndex, 1)[0];
      if (columnToMove) {
        columnList?.splice(toColumnIndex, 0, columnToMove);
      }
    },
  },
});
