import { combineReducers } from 'redux';
import { counter } from './counter';
import { viewSlice } from './viewSlice';
import { authSlice } from './authSlice';
export const stateActions = {
  counter: counter.actions,
};
export const state = combineReducers({
  counter: counter.reducer,
  auth: authSlice.reducer,
  view: viewSlice.reducer,
});
