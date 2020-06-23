import { drawViewSlice } from './slices/draw/drawView';
import { nextDrawSlice } from './slices/draw/nextDrawSlice';
import { drawNowSlise } from './slices/draw/drawNow';
import { drawIsLoadingSlice } from './slices/draw/drawIsLoadingSlice';
import { markdowmSlice } from './slices/markdownFieldSlice';
import { imgFieldsSlice } from './slices/imgFieldsSlice';
import { TextFieldsSlice } from './slices/textFieldsSlice';
import { combineReducers } from 'redux';
import { counter } from './counter';
import { viewSlice } from './slices/viewSlice';
import { authSlice } from './slices/authSlice';
import { screensSlice } from './slices/screensSlice';
import { checkoutSlice } from './slices/checkoutSlice';
import { drawListSlise } from './slices/draw/drawListSlice';
import { drawUpdateSlice } from './slices/draw/drawUpdateSlice';
import { qrFilterSlise } from './slices/qr/filterQrsSlice';
import { qrLoadingReducer } from './slices/qr/qrIsLoadingSlice.constructor';
import { qrListSlise } from './slices/qr/qrList.slice';
export const stateActions = {
  counter: counter.actions,
};

const drawsReducer = combineReducers({
  items: drawListSlise.reducer,
  isLoading: drawIsLoadingSlice.reducer,
  now: drawNowSlise.reducer,
  updateId: drawUpdateSlice.reducer,
  next: nextDrawSlice.reducer,
  view: drawViewSlice.reducer,
});

const qrReducer = combineReducers({
  filter: qrFilterSlise.reducer,
  isLoading: qrLoadingReducer,
  items: qrListSlise.reducer,
});

export const state = combineReducers({
  counter: counter.reducer,
  auth: authSlice.reducer,
  TextFields: TextFieldsSlice.reducer,
  imgFields: imgFieldsSlice.reducer,
  markdowmField: markdowmSlice.reducer,
  screens: screensSlice.reducer,
  checkouts: checkoutSlice.reducer,
  view: viewSlice.reducer,
  draws: drawsReducer,
  qr: qrReducer,
});
