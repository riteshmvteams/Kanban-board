import { createSlice } from "@reduxjs/toolkit";
import data from "../utils/data/data.json";
import {
  getLocalStorage,
  setLocalStorage,
} from "../utils/helpers/localstorage";

const initialState = {
  boards: getLocalStorage("boards", data.boards, true),
  taskDetail: null,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addBoard: (state, action) => {
      state.boards.push(action.payload);

      state.boards.map((board) => {
        return (board.isActive = false);
      });

      state.boards[state.boards.length - 1].isActive = true;

      setLocalStorage("boards", state.boards, true);
    },

    editBoard: (state, action) => {
      const activeBoardIndex = state.boards.findIndex(
        (board) => board.isActive
      );
      state.boards[activeBoardIndex] = action.payload;
      setLocalStorage("boards", state.boards, true);
    },

    updateActiveBoard: (state, action) => {
      state.boards.map((board) => {
        return (board.isActive = false);
      });

      state.boards[action.payload].isActive = true;

      setLocalStorage("boards", state.boards, true);
    },

    deleteBoard: (state, action) => {
      state.boards = state.boards.filter(
        (board) => board.name !== action.payload
      );

      if (state.boards.length !== 0) {
        state.boards[0].isActive = true;
      }

      setLocalStorage("boards", state.boards, true);
    },

    addTask: (state, action) => {
      const taskName = action.payload.status;
      const activeBoardIndex = state.boards.findIndex(
        (board) => board.isActive
      );
      const taskIndex = state.boards[activeBoardIndex].columns.findIndex(
        (board) => board.name === taskName
      );
      state.boards[activeBoardIndex].columns[taskIndex].tasks.push(
        action.payload
      );

      setLocalStorage("boards", state.boards, true);
    },

    changeTaskColumn: (state, action) => {
      const taskName = action.payload.name;
      const activeBoardIndex = state.boards.findIndex(
        (board) => board.isActive
      );
      const taskIndex = state.boards[activeBoardIndex].columns.findIndex(
        (board) => board.name === taskName
      );

      const result = state.boards[activeBoardIndex].columns[
        taskIndex
      ].tasks.map((task) => {
        if (task.title === action.payload.title) {
          return {
            ...task,
            status: action.payload.updatedName,
          };
        } else {
          return task;
        }
      });

      state.boards[activeBoardIndex].columns[taskIndex].tasks = result;

      console.log(state.boards, "boards ========================");
    },

    setActiveTask: (state, action) => {
      state.taskDetail = action.payload;
    },

    setTaskStatus: (state, action) => {
      const activeBoardIndex = state.boards.findIndex(
        (board) => board.isActive
      );
      const taskIndex = state.boards[activeBoardIndex].columns.findIndex(
        (board) => board.name === action.payload.name
      );
      const subTaskIndex = state.boards[activeBoardIndex].columns[
        taskIndex
      ].tasks.findIndex((task) => task.title === state.taskDetail.task.title);

      state.boards[activeBoardIndex].columns[taskIndex].tasks[
        subTaskIndex
      ].subtasks[action.payload.index].isCompleted = state.boards[
        activeBoardIndex
      ].columns[taskIndex].tasks[subTaskIndex].subtasks[action.payload.index]
        .isCompleted
        ? false
        : true;

      setLocalStorage("boards", state.boards, true);
    },

    deleteTask: (state, action) => {
      const payload = action.payload;
      const activeBoardIndex = state.boards.findIndex(
        (board) => board.isActive
      );
      const taskIndex = state.boards[activeBoardIndex].columns.findIndex(
        (board) => board.name === payload.board.name
      );

      state.boards[activeBoardIndex].columns[taskIndex].tasks = state.boards[
        activeBoardIndex
      ].columns[taskIndex].tasks.filter(
        (subTask) => subTask.title !== payload.task.title
      );

      setLocalStorage("boards", state.boards, true);
    },
  },
});

export const boards = (state) => state.board.boards;

export const {
  addBoard,
  updateActiveBoard,
  deleteBoard,
  addTask,
  editBoard,
  setActiveTask,
  setTaskStatus,
  deleteTask,
  changeTaskColumn,
} = boardSlice.actions;

export default boardSlice.reducer;
