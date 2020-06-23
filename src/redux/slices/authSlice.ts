import { GetPhoneDto } from './../../apiWorker/typings/index';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../createStore';

export type Auth = {
  phone: string;
  password: string;
  token: string;
  isTokenValid: boolean;
  isLoading: boolean;
  phones: GetPhoneDto[];
};

const asyncAuthActions = {
  loginRequest: createAction('auth/login_request'),
  getPhones_async: createAction('auth/get_phones'),
};

const initialState: Auth = {
  phone: '',
  password: '',
  token: '',
  isTokenValid: false,
  isLoading: false,
  phones: [],
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
      state.isLoading = false;
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
    getPhones: (state, action: PayloadAction<GetPhoneDto[]>) => {
      state.phones = action.payload;
    },
  },
  extraReducers: {
    [asyncAuthActions.loginRequest.type]: (state, action) => {
      state.isLoading = true;
    },
  },
});

export const phonesSelector = (state: RootState) => state.auth.phones;

export const authActions = {
  ...asyncAuthActions,
  ...authSlice.actions,
};
