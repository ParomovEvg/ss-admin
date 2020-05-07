import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Auth = {
  phone: string;
  password: string;
  token: string;
  isTokenValid: boolean;
};

const initialState: Auth = {
  phone: '',
  password: '',
  token: '',
  isTokenValid: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string }>) => {
      state.isTokenValid = true;
      state.token = action.payload.token;
    },
    logout: (state, action: PayloadAction<{}>) => {
      state.token = '';
      state.isTokenValid = false;
    },
    tokenExpired: (state) => {
      state.isTokenValid = false;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

const asyncAuthActions = {
  loginRequest: createAction('auth/login_request'),
};
export const authActions = { ...asyncAuthActions, ...authSlice.actions };
