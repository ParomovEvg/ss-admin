import { createSlice } from '@reduxjs/toolkit';
import { TextFieldsActions } from './textFieldsSlice';
import { imgFieldsActions } from './imgFieldsSlice';
import { checkoutActions } from './checkoutSlice';

export interface View {
  isMenuOpen: boolean;
  AddTextFieldModal: boolean;
  AddImgFieldModal: boolean;
  AddCheckoutModal: boolean;
  textFieldDeteleModal: {
    isTextFieldDeteleModal: boolean;
    idTextField: number;
  };
  imgFieldDeteleModal: {
    isImgFieldDeteleModal: boolean;
    idImgField: number;
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
  AddCheckoutModal: false,
  textFieldDeteleModal: { isTextFieldDeteleModal: false, idTextField: 0 },
  imgFieldDeteleModal: { isImgFieldDeteleModal: false, idImgField: 0 },
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
    openAddCheckoutModal: (state) => {
      state.AddCheckoutModal = true;
    },
    closeAddCheckoutModal: (state) => {
      state.AddCheckoutModal = false;
    },
    openCheckoutDeleteModal: (state, action) => {
      state.checkoutDeteleModal.isCheckoutDeteleModal = true;
      state.checkoutDeteleModal.idCheckout = action.payload;
    },
    closeCheckoutDeleteModal: (state) => {
      state.checkoutDeteleModal.isCheckoutDeteleModal = false;
      state.checkoutDeteleModal.idCheckout = 0;
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
  },
});

export const viewActions = { ...viewSlice.actions };
