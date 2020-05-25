import { createSlice } from '@reduxjs/toolkit';
import { TextFieldsActions } from './textFieldsSlice';
import { imgFieldsActions } from './imgFieldsSlice';
import { checkoutActions } from './checkoutSlice';
import { markdownActions } from './markdownFieldSlice';

export interface View {
  isMenuOpen: boolean;
  AddTextFieldModal: boolean;
  AddImgFieldModal: boolean;
  AddMarkdownFieldModal: boolean;
  AddCheckoutModal: boolean;
  textFieldDeteleModal: {
    isTextFieldDeteleModal: boolean;
    idTextField: number;
  };
  imgFieldDeteleModal: {
    isImgFieldDeteleModal: boolean;
    idImgField: number;
  };
  markdownFieldDeteleModal: {
    isMarkdownFieldDeteleModal: boolean;
    idMarkdownField: number;
  };
  checkoutDeteleModal: {
    isCheckoutDeteleModal: boolean;
    idCheckout: number;
  };
}

const initialState: View = {
  isMenuOpen: false,
  AddTextFieldModal: false,
  AddImgFieldModal: false,
  AddMarkdownFieldModal: false,
  AddCheckoutModal: false,
  textFieldDeteleModal: { isTextFieldDeteleModal: false, idTextField: 0 },
  imgFieldDeteleModal: { isImgFieldDeteleModal: false, idImgField: 0 },
  markdownFieldDeteleModal: {
    isMarkdownFieldDeteleModal: false,
    idMarkdownField: 0,
  },
  checkoutDeteleModal: { isCheckoutDeteleModal: false, idCheckout: 0 },
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
        isTextFieldDeteleModal: false,
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
        isImgFieldDeteleModal: false,
      };
    },
    openDeleteImgFieldModal: (state, action) => {
      state.imgFieldDeteleModal = {
        idImgField: action.payload,
        isImgFieldDeteleModal: true,
      };
    },
    closeDeleteMarkdownFieldModal: (state) => {
      state.markdownFieldDeteleModal = {
        idMarkdownField: 0,
        isMarkdownFieldDeteleModal: false,
      };
    },
    openDeleteMarkdownFieldModal: (state, action) => {
      state.markdownFieldDeteleModal = {
        idMarkdownField: action.payload,
        isMarkdownFieldDeteleModal: true,
      };
    },
    openCheckoutDeleteModal: (state, action) => {
      state.checkoutDeteleModal.isCheckoutDeteleModal = true;
      state.checkoutDeteleModal.idCheckout = action.payload;
    },
    closeCheckoutDeleteModal: (state) => {
      state.checkoutDeteleModal.isCheckoutDeteleModal = false;
      state.checkoutDeteleModal.idCheckout = 0;
    },
    openAddTextFieldModal: (state) => {
      state.AddTextFieldModal = true;
    },
    closeAddTextFieldModal: (state) => {
      state.AddTextFieldModal = false;
    },
    openAddMarkdownFieldModal: (state) => {
      state.AddMarkdownFieldModal = true;
    },
    closeAddMarkdownFieldModal: (state) => {
      state.AddMarkdownFieldModal = false;
    },
    openAddImgFieldModal: (state) => {
      state.AddImgFieldModal = true;
    },
    closeAddImgFieldModal: (state) => {
      state.AddImgFieldModal = false;
    },
    openAddCheckoutModal: (state) => {
      state.AddCheckoutModal = true;
    },
    closeAddCheckoutModal: (state) => {
      state.AddCheckoutModal = false;
    },
  },
  extraReducers: {
    [TextFieldsActions.addTextField.type]: (state) => {
      state.AddTextFieldModal = false;
    },
    [imgFieldsActions.addImgField.type]: (state) => {
      state.AddImgFieldModal = false;
    },
    [checkoutActions.addCheckout.type]: (state) => {
      state.AddCheckoutModal = false;
    },
    [markdownActions.addMarkdownField.type]: (state) => {
      state.AddMarkdownFieldModal = false;
    },
  },
});

export const viewActions = { ...viewSlice.actions };
