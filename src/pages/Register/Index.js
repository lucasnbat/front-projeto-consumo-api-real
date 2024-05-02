import React, { useState } from 'react';
// esse é o cara que dispara as ações
// as ações mandam o que vai ser feito de alteração
// elas tem um tipo, payload, igual o que vimos na rocketseat
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';

export default function Register() {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const id = useSelector((state) => (state.auth.user.id));
  const nomeStored = useSelector((state) => (state.auth.user.nome));
  const emailStored = useSelector((state) => (state.auth.user.email));

  React.useEffect(() => {
    if (!id) return; // se não tem id, passa dessa função

    setNome(nomeStored);
    setEmail(emailStored);
  }, [emailStored, id, nomeStored]); // coloca vars aqui (id, nomeStored, etc)

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

    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error('Senha precisa ter entre 6 e 50 caracteres');
    }

    if (formErrors) return;

    // coloquei uma função qualquer aqui
    dispatch(actions.registerRequest({
      nome, email, password, id,
    }));

    // setIsLoading(true);

    // try {
    //   await axios.post('http://192.168.100.192/users', {
    //     nome,
    //     password,
    //     email,
    //   });

    //   toast.success('Você fez seu cadastro com sucesso!');
    //   setIsLoading(false);
    //   history.push('/login'); // redireciona para a página de login
    // } catch (err) {
    //   const errors = get(err, 'response.data.errors', []);
    //   console.log(errors);

    //   errors.map((erro) => toast.error(erro));
    //   setIsLoading(false);
    // }
  }

  return (
    <Container>

      <Loading isLoading={isLoading} />

      <h1>{id ? 'Editar meus dados' : 'Crie sua conta'}</h1>

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

        <button type="submit">{id ? 'Salvar' : 'Criar conta'}</button>
      </Form>
    </Container>
  );
}
