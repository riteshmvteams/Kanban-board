import { createSlice } from "@reduxjs/toolkit";
import data from "../utils/data/data.json";

const initialState = {
  boards: data.boards,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    add: () => {},
  },
});

export const boards = (state) => state.board.boards;

export const { add } = boardSlice.actions;

export default boardSlice.reducer;
