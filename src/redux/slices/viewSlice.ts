import { createSlice } from '@reduxjs/toolkit';
import { TextFieldsActions } from './textFieldsSlice';
import { imgFieldsActions } from './imgFieldsSlice';

export interface View {
  isMenuOpen: boolean;
  AddTextFieldModal: boolean;
  AddImgFieldModal: boolean;
  textFieldDeteleModal: {
    isTextFieldDeteleModal: boolean;
    idTextField: number;
  };
  imgFieldDeteleModal: {
    isImgFieldDeteleModal: boolean;
    idImgField: number;
  };
}

const initialState: View = {
  isMenuOpen: false,
  AddTextFieldModal: false,
  AddImgFieldModal: false,
  textFieldDeteleModal: { isTextFieldDeteleModal: false, idTextField: 0 },
  imgFieldDeteleModal: { isImgFieldDeteleModal: false, idImgField: 0 },
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
    closeDeleteTextFieldModal: (state) => {
      state.textFieldDeteleModal = {
        idTextField: 0,
        isTextFieldDeteleModal: !state.textFieldDeteleModal
          .isTextFieldDeteleModal,
      };
    },
    openDeleteTextFieldModal: (state, action) => {
      state.textFieldDeteleModal = {
        idTextField: action.payload,
        isTextFieldDeteleModal: true,
      };
    },
    closeDeleteImgFieldModal: (state) => {
      state.imgFieldDeteleModal = {
        idImgField: 0,
        isImgFieldDeteleModal: !state.imgFieldDeteleModal.isImgFieldDeteleModal,
      };
    },
    openDeleteImgFieldModal: (state, action) => {
      state.imgFieldDeteleModal = {
        idImgField: action.payload,
        isImgFieldDeteleModal: true,
      };
    },
    openAddTextFieldModal: (state) => {
      state.AddTextFieldModal = true;
    },
    closeAddTextFieldModal: (state) => {
      state.AddTextFieldModal = false;
    },
    openAddImgFieldModal: (state) => {
      state.AddImgFieldModal = true;
    },
    closeAddImgFieldModal: (state) => {
      state.AddImgFieldModal = false;
    },
  },
  extraReducers: {
    [TextFieldsActions.addTextField.type]: (state) => {
      state.AddTextFieldModal = false;
    },
    [imgFieldsActions.addImgField.type]: (state) => {
      state.AddImgFieldModal = false;
    },
  },
});

export const viewActions = { ...viewSlice.actions };
