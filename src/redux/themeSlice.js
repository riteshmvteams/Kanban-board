import { createSlice } from "@reduxjs/toolkit";
import {
  getLocalStorage,
  setLocalStorage,
} from "../utils/helpers/localstorage";

const initialState = {
  theme: getLocalStorage("theme", "dark", false),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      setLocalStorage("theme", state.theme, false);
    },
  },
});

export const currentTheme = (state) => state.theme.theme;

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
