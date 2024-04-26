import React, { useEffect, useState } from 'react';
// esse é o cara que dispara as ações
// as ações mandam o que vai ser feito de alteração
// elas tem um tipo, payload, igual o que vimos na rocketseat
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import { AlunoContainer } from './styled';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get('http://192.168.100.122/alunos');
      setAlunos(response.data);
    }

    getData();
  }, []);

  return (
    <Container>
      <h1>Alunos</h1>
      <AlunoContainer>
        {alunos.map((aluno) => (
          <div key={String(aluno.id)}>
            <img src={aluno.Fotos[0].url} alt="" />
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
