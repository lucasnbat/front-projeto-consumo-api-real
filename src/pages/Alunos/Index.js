import React from 'react';
// esse é o cara que dispara as ações
// as ações mandam o que vai ser feito de alteração
// elas tem um tipo, payload, igual o que vimos na rocketseat
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';

export default function Alunos() {
  React.useEffect(() => {
    async function getData() {
      const response = await axios.get('http://192.168.100.200:3001/alunos');
      console.log(response);
    }

    getData();
  }, []);

  return (
    <Container>
      <h1>Alunos</h1>
    </Container>
  );
}
