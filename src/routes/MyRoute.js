import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Component: Componente que será renderizado, analogo ao component do Route
 * isClosed: Indica se a rota é fechada ou não, ou seja, se precisa de autenticação
 * isClosed foi criada por nós, não é um parâmetro padrão do Route
 * ...rest: Todos os outros parâmetros que o Route aceita
 */

export default function MyRoute({ component: Component, isClosed, ...rest }) {
  const isLoggedIn = false;

  // Se a rota é fechada e o usuário não está logado, redireciona para a página de login
  // rest.location.pathname é a rota que o usuário tentou acessar e foi redirecionado
  // se passou do if, ou é pq está logado ou porque a rota não precisa de autenticação
  // então passa direto e renderiza o componente usando o <Route />
  if (isClosed && !isLoggedIn) {
    return (
      <Redirect
        to={{ pathname: 'login', state: { prevPath: rest.location.pathname } }}
      />
    );
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} component={Component} />;
}

// por padrão a rota é aberta, então isClosed é false
MyRoute.defaultProps = {
  isClosed: false,
};

MyRoute.propTypes = {
  // component ou será um elemento do react ou uma funnção, e é obrigatoria
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  // isClosed é um booleano, e não é obrigatório
  isClosed: PropTypes.bool,
};
