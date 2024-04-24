import {
  call, put, takeLatest, all,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';

// simulando requisição
const requisicao = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 600);
});

// função geradora = function*
function* exampleRequest() {
  try {
    yield call(requisicao); // se tivesse parametro: (requisicao, param1, param2, param3)
    yield put(actions.clicaBotaoSucess());
  } catch { // em caso de falha
    toast.error('Deu erro na requisição');
    yield put(actions.clicaBotaoFailure());
  }
}

// all: permite escutar várias actions
// takeLatest: permite que a última requisição seja a que vai ser executada
// como segundo parametro eu coloco a função que vai ser executada
export default all([
  takeLatest(types.BOTAO_CLICADO_REQUEST, exampleRequest),
]);

/**
 * O caminho é:
 * 1. O usuário clica no botão
 * 2. A action BOTAO_CLICADO_REQUEST é disparada pelo clicaBotaoRequest()
 * 3. O saga tem o all() que está escutando o BOTAO_CLICADO_REQUEST e executa o exampleRequest()
 * 4. O exampleRequest() chama a função requisicao()
 */
