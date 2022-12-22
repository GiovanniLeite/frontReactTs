/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import axios from '../../../services/axios';
import { User } from '../../models/user';

export interface RegisterPayload {
  id?: number | string;
  name: string;
  adm: number;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginSuccessPayload {
  token: string;
  user: User;
}

export interface AuthState {
  isLoggedIn: boolean;
  token: string;
  user?: User;
  isLoading: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: '',
  user: undefined,
  isLoading: false,
};

// to be used for slice or mockStore
export const reducersObj = {
  loginRequest(state: AuthState, action: PayloadAction<LoginPayload>) {
    state.isLoading = true;
  },
  loginSuccess(state: AuthState, action: PayloadAction<LoginSuccessPayload>) {
    state.isLoggedIn = true;
    state.token = action.payload.token;
    state.user = action.payload.user;
    state.isLoading = false;
  },
  loginFailure(state: AuthState) {
    delete axios.defaults.headers.Authorization;
    state.isLoggedIn = false;
    state.token = '';
    state.user = undefined;
    state.isLoading = false;
  },

  registerRequest(state: AuthState, action: PayloadAction<RegisterPayload>) {
    state.isLoading = true;
  },
  registerCreatedSuccess(state: AuthState) {
    state.isLoading = false;
  },
  registerUpdatedSuccess(state: AuthState, action: PayloadAction<User>) {
    state.user = action.payload;
    state.isLoading = false;
  },
  registerFailure(state: AuthState) {
    state.isLoading = false;
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: reducersObj,
});

// Actions
export const authActions = authSlice.actions;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
