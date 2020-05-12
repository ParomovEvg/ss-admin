import { createSlice, } from '@reduxjs/toolkit';

export type app = {
  isAppActive: boolean;
};

const initialState: app = {
  isAppActive: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    lounch: (state) => {
			state.isAppActive = true
		}
  },
});

export const appActions = {
  ...appSlice.actions,
};
