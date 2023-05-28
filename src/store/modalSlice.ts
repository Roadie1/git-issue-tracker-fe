import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  title: string;
  message: string;
  show: boolean;
}

const initialState: ModalState = {
  title: '',
  message: '',
  show: false
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (_state: ModalState, action: PayloadAction<{ title: string, message: string }>) => {
      const { title, message } = action.payload;
      return { show: true, title, message };
    },
    closeModal: (state: ModalState) => {
      state.show = false;
    }
  },
});

export const { showModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;