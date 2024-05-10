import React from 'react';
// esse é o cara que dispara as ações
// as ações mandam o que vai ser feito de alteração
// elas tem um tipo, payload, igual o que vimos na rocketseat
import { get } from 'lodash';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import { Form, Title } from './styled';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Fotos({ match }) {
  const id = get(match, 'params.id', '');
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [foto, setFoto] = React.useState();

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('http://192.168.100.224/alunos');
        setFoto(get(data, 'Fotos[0].url', ''));
      } catch (err) {
        toast.error('Erro ao obter imagem');
        history.push('/');
      }

      getData();
    };
  }, []);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(foto); // cria url da foto upada

    // vai mudar a url da minha tag <img> para altearar a imagem visualizada
    setFoto(fotoURL);

    const formData = new FormData();

    // cmampos enviados na requisição
    formData.append('aluno_id', id);
    formData.append('foto', file); // pega a foto

    try {
      setIsLoading(true);

      await axios.post('http://192.168.100.224/fotos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Foto enviada com sucesso!');

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const { status } = get(err, 'response', '');
      toast.error('Erro ao enviar foto');

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>Fotos</Title>

      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="foto" /> : 'Selecionar'}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
