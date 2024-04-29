import {
  call, put, takeLatest, all,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';

// função geradora = function*
function* loginRequest({ payload }) {
  yield console.log('SAGA', payload);
}

// all: permite escutar várias actions
// takeLatest: permite que a última requisição seja a que vai ser executada
// como segundo parametro eu coloco a função que vai ser executada
export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
]);

/**
 * O caminho é:
 * 1. O usuário clica no botão
 * 2. A action BOTAO_CLICADO_REQUEST é disparada pelo clicaBotaoRequest()
 * 2.1 O reducer escuta a ação e altera o estado
 * 3. O saga tem o all() que está escutando o BOTAO_CLICADO_REQUEST e executa o exampleRequest()
 * 4. O exampleRequest() chama a função requisicao()
 * 5. Retorna o resultado da requisição para o usuário
 */
