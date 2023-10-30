import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./themeSlice";
import boardReducer from "./boardSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    board: boardReducer,
  },
});

export default store;
