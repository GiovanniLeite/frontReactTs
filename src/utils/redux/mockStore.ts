/* eslint-disable no-param-reassign */
import { configureStore, createSlice } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../../redux/app/rootSaga';
import { reducersObj } from '../../redux/features/auth/slice';

export const mockedStateUser = {
  isLoggedIn: true,
  token: 'token',
  user: {
    id: 1,
    name: 'Niko Bellic',
    adm: 0,
    email: 'niko.bellic@outlook.com',
  },
  isLoading: false,
};

export const mockedStateNoUser = {
  isLoggedIn: false,
  token: '',
  user: undefined,
  isLoading: false,
};

export const sagaMiddleware = createSagaMiddleware();
export const mockStore = (authState) => {
  const store = configureStore({
    reducer: {
      auth: createSlice({
        name: 'auth',
        initialState: authState,
        reducers: reducersObj,
      }).reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
  });
  sagaMiddleware.run(rootSaga);

  return store;
};
