import React, { useState } from 'react';
// esse é o cara que dispara as ações
// as ações mandam o que vai ser feito de alteração
// elas tem um tipo, payload, igual o que vimos na rocketseat
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';
import history from '../../services/history';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import axios from '../../services/axios';
import Loading from '../../components/Loading';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const id = useSelector((state) => console.log(state.auth.user.id));
  const userStored = useSelector((state) => console.log(state.auth.user.nome));
  const emailStored = useSelector((state) => console.log(state.auth.user.email));

  async function handleSubmit(e) {
    e.preventDefault();

    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome precisa ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha precisa ter entre 6 e 50 caracteres');
    }

    if (formErrors) return;

    setIsLoading(true);

    try {
      await axios.post('http://192.168.100.122/users', {
        nome,
        password,
        email,
      });

      toast.success('Você fez seu cadastro com sucesso!');
      setIsLoading(false);
      history.push('/login'); // redireciona para a página de login
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);
      console.log(errors);

      errors.map((erro) => toast.error(erro));
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Crie sua conta</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
          />
        </label>
        <label htmlFor="nome">
          E-mail:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
          />
        </label>
        <label htmlFor="senha">
          Senha:
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </label>

        <button type="submit">Criar minha conta</button>
      </Form>
    </Container>
  );
}
