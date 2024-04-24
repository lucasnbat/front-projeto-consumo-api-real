import React from 'react';
import { Switch } from 'react-router-dom';
import Login from '../pages/Login/Index';
import Page404 from '../pages/Page404';
import MyRoute from './MyRoute';

/**
 * Switch permite que apenas uma rota seja chamada por vez
 * Exact determina que somente a home vai renderizar o componente Login
 * Se digitar qualquer coisa além de /, não vai renderizar nada
 * path=* siginifica que qualquer rota que não exista, vai renderizar o componente Page404
 */

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Login} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
