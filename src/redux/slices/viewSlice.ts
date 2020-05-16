import { createSlice } from '@reduxjs/toolkit';

export interface View {
  isMenuOpen: boolean;
  deteleModal: {
    isDeteleModal: boolean;
    id: number;
  };
}

const initialState: View = {
  isMenuOpen: false,
  deteleModal: { isDeteleModal: false, id: 0 },
};

export const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    openMenu: (state) => {
      state.isMenuOpen = true;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    deleteModalToggle: (state) => {
      state.deteleModal.isDeteleModal = !state.deteleModal.isDeteleModal;
    },
    openDeleteModal: (state, action) => {
      state.deteleModal.id = action.payload;
    },
  },
});

export const asyncViewActions = {};
export const viewActions = { ...viewSlice.actions, ...asyncViewActions };
