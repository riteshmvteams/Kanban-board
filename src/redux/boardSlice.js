import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    add: () => {},
  },
});

export const { add } = boardSlice.actions;

export default boardSlice.reducer;
