import React, { useState, useEffect } from 'react';
import { MdSave } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Loading } from './styles';
import { Form, Input } from '~/components/DefaultStyle';

export default function ProjectEditor({ match }) {
  const { projectId } = match.params;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProject() {
      try {
        const response = await api.get(`/projects/${projectId}`);
        const data = {
          name: response.data.name,
          description: response.data.description,
        };

        setProject(data);
        setLoading(false);
      } catch (err) {
        toast.error('Ocorreu um erro ao tentar editar o projeto');
        history.push('/dashboard');
      }
    }

    if (projectId) {
      setLoading(true);
      loadProject();
    }
  }, [projectId]);

  async function handleSubmit(data) {
    try {
      if (projectId) {
        await api.put(`/projects/${projectId}`, data);
        toast.success('Projeto atualizado com sucesso');
        history.push(`/projects/details/${projectId}`);
      } else {
        await api.post('/projects', data);
        toast.success('Projeto criado com sucesso');
        history.push(`/dashboard`);
      }
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar criar o projeto');
    }
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('Título é obrigatório'),
    description: Yup.string(),
  });

  return loading ? (
    <Loading>Carregando...</Loading>
  ) : (
    <Container>
      <Form schema={schema} initialData={project} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome do Projeto" />
        <Input name="description" placeholder="Descrição completa" multiline />
        <button type="submit">
          <MdSave size={24} color="#fff" />
          {projectId ? 'Atualizar Projeto' : 'Criar Projeto'}
        </button>
      </Form>
    </Container>
  );
}

ProjectEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string,
    }).isRequired,
  }),
};

ProjectEditor.defaultProps = {
  match: PropTypes.any,
};
