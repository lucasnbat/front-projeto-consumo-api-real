import React, { useEffect, useState } from 'react';
// esse é o cara que dispara as ações
// as ações mandam o que vai ser feito de alteração
// elas tem um tipo, payload, igual o que vimos na rocketseat
import {
  FaEdit, FaExclamation, FaExclamationCircle, FaUserCircle, FaWindowClose,
} from 'react-icons/fa';
import get from 'lodash';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import { AlunoContainer, ProfilePicture } from './styled';
import Loading from '../../components/Loading';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('http://192.168.100.224/alunos');
      setAlunos(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.persist();

    try {
      await axios.delete(`http://192.168.100.224/alunos/${id}`);

      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
      setIsLoading(false);
    } catch (err) {
      const { status } = err.response;

      if (status === 401) {
        toast.error('Você precisa fazer login');
      } else {
        toast.error('Ocorreu um erro ao excluir o aluno');
        console.log(status);
      }

      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Alunos</h1>
      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'Fotos[0].url', false) ? (
                <FaUserCircle size={36} />
                // <img src={aluno.Fotos[0].url} alt="" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>
            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>

            <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>

            <FaExclamationCircle
              size={16}
              display="none"
              cursor="pointer"
              onClick={(e) => handleDelete(e, aluno.id, index)}
            />
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
