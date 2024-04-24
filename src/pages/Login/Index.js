import React from 'react';
// esse é o cara que dispara as ações
// as ações mandam o que vai ser feito de alteração
// elas tem um tipo, payload, igual o que vimos na rocketseat
import { useDispatch } from 'react-redux';
import { Title, Paragraph } from './styled';
import { Container } from '../../styles/GlobalStyles';

import * as exampleActions from '../../store/modules/example/actions';

import axios from '../../services/axios';

export default function Login() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    dispatch(exampleActions.clicaBotaoRequest());
  }

  React.useEffect(() => {
    async function getData() {
      const response = await axios.get('http://192.168.100.200/alunos');
      const { data } = response;
      console.log(data);
    }

    getData();
  }, []);

  return (
    <Container>
      <Title>
        Login
      </Title>
      <Paragraph>Portal de Alunos</Paragraph>
      <button type="button" onClick={handleClick}>Enviar</button>
    </Container>

  );
}
