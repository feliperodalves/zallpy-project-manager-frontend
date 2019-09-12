import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { MdTimer } from 'react-icons/md';
import * as Yup from 'yup';

import { Container } from './styles';
import { Form, Input } from '~/components/DefaultStyle';
import DatePickerInput from './DatePickerInput';

import api from '~/services/api';

export default function TaskEditor({ match }) {
  const { projectId } = match.params;
  const [project, setProject] = useState([]);

  useEffect(() => {
    async function loadProject() {
      const response = await api.get(`/projects/${projectId}`);
      setProject(response.data);
    }
    loadProject();
  }, [projectId]);

  async function handleSubmit(data) {
    try {
      await api.post(`/projects/${projectId}/tasks`, data);
      toast.success('Tarefa Inserida com sucesso!');
    } catch (error) {
      toast.error('Ocorreu um erro na aplicação!');
    }
  }

  const schema = Yup.object().shape({
    title: Yup.string().required('Título é obrigatório'),
    project: Yup.string().required('O projeto é obrigatório'),
    description: Yup.string(),
    date: Yup.date().required('Data Obrigatória'),
    time: Yup.string().required('Horas é obrigatório'),
  });

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <h4>Projeto Selecionado:</h4>
        <Input name="project" value={project.name} />
        <Input name="title" placeholder="Título" />
        <Input name="description" placeholder="Descrição" multiline />
        <DatePickerInput name="date" placeholder="Data da tarefa" />
        <Input name="time" placeholder="Horas (coloque no formato: HH:MM)" />
        <button type="submit">
          <MdTimer size={20} color="#fff" />
          Registrar Tempo
        </button>
      </Form>
    </Container>
  );
}

TaskEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string,
    }).isRequired,
  }),
};

TaskEditor.defaultProps = {
  match: PropTypes.any,
};
