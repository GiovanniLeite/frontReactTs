import { put, all, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import axios, { AxiosResponseProps } from '../../../services/axios';
import { authActions } from './slice';
import * as actions from './actions';
import { get } from 'lodash';

function* loginRequest(action: ReturnType<typeof authActions.loginRequest>) {
  try {
    const response: AxiosResponseProps = yield call(
      axios.post,
      '/tokens',
      action.payload,
    );

    yield put(authActions.loginSuccess({ ...response.data }));

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
  } catch (e) {
    toast.error('Usuário ou senha inválidos.');

    yield put(authActions.loginFailure());
  }
}

function persistRehydrate(action: ReturnType<typeof actions.persistRehydrate>) {
  const token = get(action, 'payload.auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest(
  action: ReturnType<typeof authActions.registerRequest>,
) {
  const { id, name, adm, email, password } = action.payload;

  try {
    if (id) {
      yield call(axios.put, '/users', {
        name,
        adm,
        email,
        password: password || undefined,
      });
      toast.success('Conta alterada com sucesso!');
      toast.success('Você precisa fazer login novamente.');
      yield put(authActions.loginFailure());
    } else {
      yield call(axios.post, '/users', {
        name,
        adm,
        email,
        password,
      });
      toast.success('Conta criada com sucesso!');
      yield put(authActions.registerCreatedSuccess());
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      toast.error('Você precisa fazer login novamente.');
      yield put(authActions.loginFailure());
    }

    if (errors.length > 0) {
      errors.map((error: string) => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }

    yield put(authActions.registerFailure());
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(authActions.loginRequest.type, loginRequest),
    takeLatest(actions.persistRehydrate.type, persistRehydrate),
    takeLatest(authActions.registerRequest.type, registerRequest),
  ]);
}
