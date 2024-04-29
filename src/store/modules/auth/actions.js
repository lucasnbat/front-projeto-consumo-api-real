import * as types from '../types';

/**
 * Isso serve para modularizar, basicamente
 * eu tenho um dispactch com uma variavel que
 * contem as ações que eu quero disparar e
 * invoco a clicaBotao() que vai disparar
 * esse type. O type, por sua vez, aciona
 * o reducer que vai fazer a alteração no
 * estado.
 */

export function loginSucess(payload) {
  return {
    type: types.LOGIN_SUCESS,
    payload,
  };
}

export function loginFailure(payload) {
  return {
    type: types.LOGIN_FAILURE,
    payload,
  };
}

// essa função é usada para chamar o saga
// o saga vai acionar uma das duas funções acima
// e a depentender do tipo de função, o reducer vai
// fazer a alteração no estado de forma diferente
export function loginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST,
    payload,
  };
}
