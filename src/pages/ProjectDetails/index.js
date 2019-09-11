import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdEdit, MdDeleteForever, MdPersonAdd } from 'react-icons/md';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';

import SelectInput from './SelectInput';
import { Loading, Container, Details } from './styles';
import { Form } from '~/components/DefaultStyle';

export default function ProjectDetails({ match }) {
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assign, setAssign] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadProject() {
      try {
        const response = await api.get(`/projects/${match.params.projectId}`);
        setProject(response.data);
        setLoading(false);
      } catch (err) {
        toast.error('Erro ao acessar os detalhes do Projeto');
        setLoading(false);
        history.push('/dashboard');
      }
    }
    loadProject();
  }, [match.params.projectId, refresh]);

  async function loadSelectors() {
    const responseUsers = await api.get('/users');
    setUsers(responseUsers.data);
    const responseRoles = await api.get('/roles');
    setRoles(responseRoles.data);
    setAssign(true);
  }

  async function handleAddAssignment(data) {
    const { role, user } = data;
    if (role === '' || user === '') {
      toast.error('Você deve selecionar ambos campos');
    } else {
      try {
        await api.post(`/projects/${project.id}/assign/${user}/${role}`);
        toast.success('Incluído com sucesso');
        setRefresh(!refresh);
      } catch (err) {
        if (err.response.data) {
          toast.error(err.response.data.error);
        } else {
          toast.error('Ocorreu um erro inesperado');
        }
      }
      setUsers([]);
      setRoles([]);
      setAssign(false);
    }
  }

  async function deleteProject() {
    try {
      await api.delete(`/projects/${match.params.projectId}`);
      history.push('/dashboard');
    } catch (err) {
      toast.error('Erro ao excluir o Projeto');
    }
  }

  return loading ? (
    <Loading>Carregando...</Loading>
  ) : (
    <Container>
      {project ? (
        <>
          <header>
            <div className="left">
              <h4>Nome do Projeto:</h4>
              <h1>{project.name}</h1>
            </div>
            <div>
              <button
                type="button"
                onClick={() => history.push(`/project/edit/${project.id}`)}
                className="edit"
              >
                <MdEdit size={20} color="#fff" />
                Editar
              </button>
              <button type="button" onClick={deleteProject} className="exclude">
                <MdDeleteForever size={20} color="#fff" />
                Excluir
              </button>
            </div>
          </header>
          <Details>
            <h4>Descrição:</h4>
            <p>{project.description}</p>
            <h4>Participantes:</h4>
            <ul>
              {project.Assignments.map(a => (
                <li key={a.id}>
                  {a.users.name} - <span>{a.roles.name}</span>
                </li>
              ))}
            </ul>

            <div>
              {!assign ? (
                <button type="button" onClick={loadSelectors}>
                  <MdPersonAdd size={20} color="#fff" />
                  Incluir Participante
                </button>
              ) : (
                <Form onSubmit={handleAddAssignment}>
                  <h4>Usuário:</h4>
                  <SelectInput name="user" data={users} />
                  <h4>Nível de Acesso:</h4>
                  <SelectInput name="role" data={roles} />
                  <button type="submit">
                    <MdPersonAdd size={20} color="#fff" />
                    Salvar
                  </button>
                </Form>
              )}
            </div>
          </Details>
        </>
      ) : (
        <Loading>
          O projeto não existe
          <Link to="/dashboard">Clique aqui para voltar</Link>
        </Loading>
      )}
    </Container>
  );
}

ProjectDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
