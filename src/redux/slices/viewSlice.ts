import { createSlice } from '@reduxjs/toolkit';
import { fieldsActions } from './fieldsSlice';

export interface View {
  isMenuOpen: boolean;
  AddFieldModal: boolean;
  deteleModal: {
    isDeteleModal: boolean;
    id: number;
  };
}

const initialState: View = {
  isMenuOpen: false,
  AddFieldModal: false,
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
    closeDeleteFieldModal: (state) => {
      state.deteleModal = {
        id: 0,
        isDeteleModal: !state.deteleModal.isDeteleModal,
      };
    },
    openDeleteFieldModal: (state, action) => {
      state.deteleModal = {
        id: action.payload,
        isDeteleModal: true,
      };
    },
    openAddFieldModal: (state) => {
      state.AddFieldModal = true;
    },
    closeAddFieldModal: (state) => {
      state.AddFieldModal = false;
    },
  },
  extraReducers: {
    [fieldsActions.addField.type]: (state) => {
      state.AddFieldModal = false;
    },
  },
});

export const asyncViewActions = {};
export const viewActions = { ...viewSlice.actions, ...asyncViewActions };
