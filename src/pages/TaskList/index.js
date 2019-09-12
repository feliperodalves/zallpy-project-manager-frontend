import React, { useState, useEffect } from 'react';
import { parseISO, format } from 'date-fns';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import { MdTimer } from 'react-icons/md';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { Loading, Container } from './styles';
import { Form, Input } from '~/components/DefaultStyle';
import SelectInput from './SelectInput';
import DatePickerInput from './DatePickerInput';

import api from '~/services/api';

const columns = [
  { title: 'Título', field: 'title' },
  { title: 'Descrição', field: 'description' },
  { title: 'Data', field: 'formattedDate' },
  { title: 'Horas Trabalhadas', field: 'time' },
];

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [newTask, setNewTask] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const response = await api.get('/tasks');

      const data = response.data.map(a => {
        a.formattedDate = format(parseISO(response.data[0].date), 'dd/MM/yyyy');
        return a;
      });

      setLoading(false);

      setTasks(data);
    }
    loadTasks();
  }, [refresh]);

  async function loadSelectors() {
    const response = await api.get('/projects');
    setProjects(response.data);
    setNewTask(true);
  }

  async function handleSubmit(data) {
    try {
      await api.post(`/projects/${data.project}/tasks`, data);
      toast.success('Tarefa Inserida com sucesso!');
    } catch (error) {
      toast.error('Ocorreu um erro na aplixação!');
    }
    setNewTask(false);
    setRefresh(!refresh);
  }

  const schema = Yup.object().shape({
    title: Yup.string().required('Título é obrigatório'),
    project: Yup.string().required('O projeto é obrigatório'),
    description: Yup.string(),
    date: Yup.date().required('Data Obrigatória'),
    time: Yup.string().required('Horas é obrigatório'),
  });

  return loading ? (
    <Loading>Carregando...</Loading>
  ) : (
    <Container>
      {!newTask ? (
        <button type="button" onClick={loadSelectors}>
          <MdTimer size={20} color="#fff" />
          Registrar Tempo
        </button>
      ) : (
        <Form schema={schema} onSubmit={handleSubmit}>
          <button type="submit">
            <MdTimer size={20} color="#fff" />
            Registrar Tempo
          </button>
          <h4>Selecione o Projeto:</h4>
          <SelectInput name="project" data={projects} />
          <Input name="title" placeholder="Título" />
          <Input name="description" placeholder="Descrição" multiline />
          <DatePickerInput name="date" placeholder="Data da tarefa" />
          <Input name="time" placeholder="Horas (coloque no formato: HH:MM)" />
        </Form>
      )}

      {tasks.length > 0 ? (
        <MaterialTable
          title="Lista de Tarefas"
          columns={columns}
          data={tasks}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                api
                  .put(`/tasks/${oldData.id}`, newData)
                  .then(() => {
                    toast.success('Tarefa atualizada com sucesso');
                    setRefresh(!refresh);
                    resolve();
                  })
                  .catch(() => {
                    toast.error('Aconteceu um problema ao atualizar a tarefa)');
                    reject();
                  });
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                api
                  .delete(`/tasks/${oldData.id}`)
                  .then(() => {
                    toast.success('Tarefa excluída com sucesso');
                    setRefresh(!refresh);
                    resolve();
                  })
                  .catch(() => {
                    toast.error('Aconteceu um problema ao excluir a tarefa)');
                    reject();
                  });
              }),
          }}
        />
      ) : (
        <Loading>
          Nenhuma tarefa encontrada, crie um novo registro ou
          <Link to="/dashboard">Clique aqui para voltar</Link>
        </Loading>
      )}
    </Container>
  );
}
