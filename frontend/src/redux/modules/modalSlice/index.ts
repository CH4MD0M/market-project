import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState, ModalType, OpenModalPayload } from './types';

const initialState: ModalState = {
  openedModal: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<OpenModalPayload>) => {
      const { modalType, modalComponent } = action.payload;
      state.openedModal[modalType] = { modalComponent };
    },
    closeModal: (state, action: PayloadAction<ModalType>) => {
      const modalType = action.payload;
      delete state.openedModal[modalType];
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
