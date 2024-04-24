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

export function clicaBotaoSucess() {
  return {
    type: types.BOTAO_CLICADO_SUCESS,
  };
}

export function clicaBotaoFailure() {
  return {
    type: types.BOTAO_CLICADO_FAILURE,
  };
}

export function clicaBotaoRequest() {
  return {
    type: types.BOTAO_CLICADO_REQUEST,
  };
}
