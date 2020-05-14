import { fieldsSlice } from './slices/fieldsSlice';
import { valuesSlise } from './slices/fieldValuesSlice';
import { combineReducers } from 'redux';
import { counter } from './counter';
import { viewSlice } from './slices/viewSlice';
import { authSlice } from './slices/authSlice';
import { screensSlice } from './slices/screensSlice';
export const stateActions = {
  counter: counter.actions,
};
export const state = combineReducers({
  counter: counter.reducer,
  auth: authSlice.reducer,
  view: viewSlice.reducer,
  screens: screensSlice.reducer,
  values: valuesSlise.reducer,
  fields: fieldsSlice.reducer,
});
