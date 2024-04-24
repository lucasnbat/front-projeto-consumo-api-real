import React from 'react';
import { Switch } from 'react-router-dom';
import Login from '../pages/Login/Index';
import Page404 from '../pages/Page404';
import MyRoute from './MyRoute';

import Aluno from '../pages/Aluno/Index';
import Alunos from '../pages/Alunos/Index';
import Fotos from '../pages/Fotos/Index';
import Register from '../pages/Register/Index';

/**
 * Switch permite que apenas uma rota seja chamada por vez
 * Exact determina que somente a home vai renderizar o componente Login
 * Se digitar qualquer coisa além de /, não vai renderizar nada
 * path=* siginifica que qualquer rota que não exista, vai renderizar o componente Page404
 */

/**
 * CRUD
 * Create : aparentemente precisa de tela (ex: /aluno/)
 * Read : aparentemente precisa de tela (ex: / que busca todos os alunos)
 * Update : aparentemente precisa de tela (ex: /aluno/:id/edit)
 * Delete : aparentemente não precisa de tela (ex: botão de deletar)
 */
export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Alunos} isClosed={false} />
      <MyRoute exact path="/aluno/:id/edit" component={Aluno} isClosed />
      <MyRoute exact path="/aluno/" component={Aluno} isClosed />
      <MyRoute exact path="/fotos/:id/" component={Fotos} isClosed />
      <MyRoute exact path="/login/" component={Login} />
      <MyRoute exact path="/register/" component={Register} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
