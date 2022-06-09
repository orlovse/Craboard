const comments = [
  {
    id: "123",
    text: "Hello",
    dateCreated: "2020-01-01",
    user: { id: "123", name: "John", avatar: "" },
  },
];

export const boardColumnList = [
  {
    name: "todo",
    tasks: [
      {
        description: "test description",
        name: "first task",
        id: "1",
        userAssigned: null,
        createdDate: null,
        changedDate: null,
        checklist: null,
        comments,
      },
      {
        description: "",
        name: "second task",
        id: "2",
        userAssigned: null,
        createdDate: null,
        changedDate: null,
        checklist: null,
      },
      {
        description: "",
        name: "and thrid",
        id: "3",
        userAssigned: null,
        createdDate: null,
        changedDate: null,
        checklist: null,
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
        createdDate: null,
        changedDate: null,
        checklist: null,
      },
    ],
  },
  {
    name: "testing",
    tasks: [
      {
        description: "",
        name: "test task",
        id: "7",
        userAssigned: null,
        createdDate: null,
        changedDate: null,
        checklist: null,
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
        createdDate: null,
        changedDate: null,
        checklist: null,
      },
    ],
  },
];

export const boardsList = [
  { boardId: "1111", boardName: "First Board" },
  { boardId: "2222", boardName: "Second Board" },
  { boardId: "3333", boardName: "Third Board" },
];

export const labelsList = [
  {
    id: "1",
    name: "label1",
    color: "#ff0000",
    isSelected: false,
  },
  {
    id: "2",
    name: "label2",
    color: "#00ff00",
    isSelected: false,
  },
  {
    id: "3",
    name: "label3",
    color: "#0000ff",
    isSelected: false,
  },
];
