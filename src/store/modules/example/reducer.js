import * as types from '../types';
/**
 * A lógica antes envolvia:
 * 1. arquivo index do Store contendo o reducer com o switch
 * 2. Esse arquivo é acionado por qualquer outro arquivo que use o dispatch()
 * 3. useSelector() é usado para pegar o estado atual. Ele foi usado para mostrar
 *    as alternancias entre true e false ao apertar o botao
 */

/**
 * Agora parece que:
 * 1. Temos o store com todos os reducers e ele carrega eles para o Provider lá no APP
 * 2. Dentro do store temos os modules que possuem, cada um, o seu types (com os tipos
 * de ações possíveis de serem disparadas), o reducer com as manipulações de estado e
 * as actions com as funções que disparam as ações
 */

// estado inicial
const initialState = {
  botaoClicado: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.BOTAO_CLICADO_SUCESS: {
      console.log('Sucesso');
      const newState = { ...state }; // copia o estado atual
      newState.botaoClicado = !newState.botaoClicado; // modifica o novo estado para o inverso
      return newState;
    }

    case types.BOTAO_CLICADO_FAILURE: {
      console.log('Deu erro');
      return state;
    }

    case types.BOTAO_CLICADO_REQUEST: {
      console.log('Fazendo requisição para a API');
      return state;
    }

    default:
      return state;
  }
}
