import type { BoardsListType, BoardType, TaskType } from "@/stores/boards";
import { boardColumnList, boardsList } from "./mockData";

export type TaskPayloadType = {
  description: string;
  name: string;
};

export const getBoardsList = () => {
  return new Promise<BoardsListType>((resolve, reject) => {
    setTimeout(() => {
      resolve(boardsList);
    }, 200);
  });
};

export const getBoard = (boardId: string) => {
  return new Promise<BoardType>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        boardId: "1234",
        boardName: "First Board",
        boardContent: boardColumnList,
        boardImage: "",
      });
    }, 800);
  });
};

export const createTask = (
  boardId: string,
  columnId: string,
  task: TaskPayloadType
) => {
  return new Promise<TaskType>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        description: task.description,
        name: task.name,
        id: Math.random().toString(16).slice(2),
        userAssigned: null,
        createdDate: new Date().toDateString(),
        changedDate: null,
        checklist: null,
      });
    }, 100);
  });
};

export const createColumn = (boardId: string, columnName: string) => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      resolve(`id${Math.random().toString(16).slice(2)}`);
    }, 100);
  });
};

export const updateTask = (
  boardId: string,
  columnId: string,
  task: TaskType
) => {
  return new Promise<TaskType>((resolve, reject) => {
    setTimeout(() => {
      resolve(task);
    }, 100);
  });
};

export const removeTask = (
  boardId: string,
  columnId: string,
  taskId: string
) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 100);
  });
};

export const changeDashboardData = (boardId: string) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 100);
  });
};
