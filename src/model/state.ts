import { appSlice } from './appSlice';
import { combineReducers } from 'redux';
import { counter } from './counter';
import { viewSlice } from './viewSlice';
import { authSlice } from './authSlice';
import { screensSlice } from './screensSlice';
export const stateActions = {
  counter: counter.actions,
};
export const state = combineReducers({
  counter: counter.reducer,
  auth: authSlice.reducer,
	view: viewSlice.reducer,
	app: appSlice.reducer,
	screens: screensSlice.reducer,
});
