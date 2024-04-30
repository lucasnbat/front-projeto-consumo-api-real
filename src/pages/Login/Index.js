import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// esse é o cara que dispara as ações
// as ações mandam o que vai ser feito de alteração
// elas tem um tipo, payload, igual o que vimos na rocketseat
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import get from 'lodash';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // auth é somente um dos modulos do estado
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = false;
    console.log(email);

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha inválida');
    }

    if (formErrors) return; // se não tem erro, vai disparar o dispatch

    dispatch(actions.loginRequest({ email, password, prevPath }));
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
        />
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Sua senha"
        />

        <button type="submit">Acessar</button>
      </Form>

    </Container>
  );
}
