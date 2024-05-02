import {
  call, put, takeLatest, all,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import history from '../../../services/history';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';

// função geradora = function*
// payload = dados que o usuário enviou (email, senha, prevPath)
function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, 'http://192.168.100.192/tokens', payload);
    yield put(actions.loginSucess({ ...response.data })); // volta o token gerado para o user

    toast.success('Você fez login');

    // definindo o token no header por padrão
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`; // token gerado no header
    history.push(payload.prevPath); // redireciona o usuário para a página que ele estava antes
  } catch (error) {
    toast.error('Usuário ou senha inválidos');
    yield put(actions.loginFailure());
  }
}

// isso é para salvar o token no header toda vez que a página for recarregada
function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({ payload }) {
  const {
    nome, email, password, id,
  } = payload;
  try {
    if (id) {
      yield call(axios.put, 'http://192.168.100.192/users', {
        email,
        nome,
        password: password || undefined, // se o usuário atualizar senha, ok, se não, não
      });
      toast.success('Conta alterada com sucesso!');
      yield put(actions.registerUpdatedSucess({ nome, email, password }));
    } else {
      yield call(axios.post, 'http://192.168.100.192/users', {
        email,
        nome,
        password, // se o usuário atualizar senha, ok, se não, não
      });
      toast.success('Conta criada com sucesso!');
      yield put(actions.registerCreatedSucess({ nome, email, password }));
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }

    yield put(actions.registerFailure());
  }
}

// all: permite escutar várias actions
// takeLatest: permite que a última requisição seja a que vai ser executada
// como segundo parametro eu coloco a função que vai ser executada
export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
