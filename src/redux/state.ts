import { imgFieldsSlice } from './slices/imgFieldsSlice';
import { TextFieldsSlice } from './slices/textFieldsSlice';
import { combineReducers } from 'redux';
import { counter } from './counter';
import { viewSlice } from './slices/viewSlice';
import { authSlice } from './slices/authSlice';
import { screensSlice } from './slices/screensSlice';
import { checkoutSlice } from './slices/checkoutSlice';
export const stateActions = {
  counter: counter.actions,
};
export const state = combineReducers({
  counter: counter.reducer,
  TextFields: TextFieldsSlice.reducer,
  imgFields: imgFieldsSlice.reducer,
  auth: authSlice.reducer,
  view: viewSlice.reducer,
  screens: screensSlice.reducer,
  checkouts: checkoutSlice.reducer,
});
