import { labelsList } from "./../api/mockData";
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

export type CommentType = {
  id: string;
  text: string;
  dateCreated: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
};

export type TaskType = {
  description: string;
  name: string;
  id: string;
  userAssigned: null;
  createdDate: string | null;
  changedDate: string | null;
  checklist: TaskChecklistType | null;

  comments?: CommentType[];
  files?: {
    filename: string;
    file: string;
  }[];
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
  boardImage: string;
};

export type BoardsHashType = {
  [boardId: string]: BoardType;
};

export type LabelType = {
  id: string;
  name: string;
  color: string;
  isSelected: boolean;
};

export type BoardsStateType = {
  loading: boolean;
  labelsList: LabelType[];
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
      labelsList,
      loading: false,
      boardLoading: false,
      boardImage: "",
    } as BoardsStateType),
  getters: {
    getBoardById: (state) => {
      return (boardId: string) => {
        const { boards } = state;

        if (boards) {
          return boards[boardId];
        }
      };
    },
    labels: (state) => {
      return state.labelsList;
    },
    selectedLabels: (state) => {
      return state.labelsList.filter((label) => label.isSelected);
    },
  },
  actions: {
    addNewBoardAction(boardName: string) {
      this.boardsList.push({ boardId: Date.now().toString(), boardName });
    },
    setBoardImageAction(fileObject: any) {
      const boardId = router.currentRoute.value.params.boardId as string;

      const activeBoard = this.getBoardById(boardId);

      if (activeBoard) {
        activeBoard.boardImage = fileObject.file;
      }
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

          this.getBoardById(boardId)?.boardContent.push({
            name,
            tasks: [],
          });
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    updateTaskAction(task: any, key: TaskKeyType, value: string) {
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

      const columnList = this.getBoardById(boardId)?.boardContent;
      const columnToMove = columnList?.splice(fromColumnIndex, 1)[0];

      if (columnToMove) {
        columnList?.splice(toColumnIndex, 0, columnToMove);
      }
    },
    addLabelAction(label: LabelType) {
      this.labelsList.push(label);
    },
    removeLabelAction(labelId: string) {
      this.labelsList = this.labelsList.filter((label) => {
        return label.id !== labelId;
      });
    },
    addCommentAction(commentText: string, task: TaskType | null) {
      if (task) {
        const oldComments = task.comments || [];
        task.comments = [
          ...oldComments,
          {
            id: Date.now().toString(),
            text: commentText,
            dateCreated: new Date().toISOString(),
            user: {
              id: "1",
              name: "John Doe",
              avatar: "",
            },
          },
        ];
      }
    },
    editCommentAction(commentText: string, comment: CommentType) {
      comment.text = commentText;
    },
    removeCommentAction(commentId: string, task: TaskType | null) {
      if (task) {
        task.comments = task.comments?.filter((comment) => {
          return comment.id !== commentId;
        });
      }
    },
    addAttachmentAction(task: TaskType, file: any) {
      if (task.files) {
        task.files?.push(file);
      } else {
        task.files = [file];
      }
    },
    removeAttachmentAction(task: TaskType | null, filename: string) {
      if (task) {
        task.files = task.files?.filter((file) => {
          return file.filename !== filename;
        });
      }
    },
  },
});
