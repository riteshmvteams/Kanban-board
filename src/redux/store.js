import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./themeSlice";
import boardReducer from "./boardSlice";
import modalReducer from "./modalSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    board: boardReducer,
    modal: modalReducer,
  },
});

export default store;
