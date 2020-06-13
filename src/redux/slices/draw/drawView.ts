import { nextDrawActions } from './nextDrawSlice';
import { createSlice } from '@reduxjs/toolkit';
import { drawListActions } from './drawListSlice';

export interface drawView {
  AddDrawdModal: boolean;
  updateDrawModal: boolean;
  nextDrawModal: boolean;
  DrawDeteleModal: {
    isDrawDeteleModal: boolean;
    idDraw: number;
  };
}

const initialState: drawView = {
  AddDrawdModal: false,
  updateDrawModal: false,
  nextDrawModal: false,
  DrawDeteleModal: {
    isDrawDeteleModal: false,
    idDraw: 0,
  },
};

export const drawViewSlice = createSlice({
  name: 'draw/view',
  initialState,
  reducers: {
    openAddDrawModal: (state) => {
      state.AddDrawdModal = true;
    },
    closeAddDrawModal: (state) => {
      state.AddDrawdModal = false;
    },
    openUpdateModal: (state) => {
      state.updateDrawModal = true;
    },
    closeUpdateModal: (state) => {
      state.updateDrawModal = false;
    },
    openNextDrawModal: (state) => {
      state.nextDrawModal = true;
    },
    closeNextDrawModal: (state) => {
      state.nextDrawModal = false;
    },
    closeDeleteDrawModal: (state) => {
      state.DrawDeteleModal = {
        idDraw: 0,
        isDrawDeteleModal: false,
      };
    },
    openDeleteDrawModal: (state, action) => {
      state.DrawDeteleModal = {
        idDraw: action.payload,
        isDrawDeteleModal: true,
      };
    },
  },
  extraReducers: {
    [drawListActions.addSuccessful.type]: (state) => {
      state.AddDrawdModal = false;
    },
    [drawListActions.updateSuccessful.type]: (state) => {
      state.updateDrawModal = false;
    },
    [nextDrawActions.nextDraw_successful.type]: (state) => {
      state.AddDrawdModal = false;
    },
  },
});

export const drawViewActions = { ...drawViewSlice.actions };
