import { defineStore } from "pinia";

const boardList = [
  {
    name: "todo",
    tasks: [
      {
        description: "",
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

type Board = {
  name: string;
  tasks: Task[];
};

export type BoardsState = {
  loading: false;
  boards:
    | {
        boardId: string;
        boardName: string;
        boardContent: Board[];
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
  },
});
