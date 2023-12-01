import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  modalType: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalType = action.payload;
    },

    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalType = null;
    },
  },
});

export const { closeModal, openModal } = modalSlice.actions;

export default modalSlice.reducer;
