import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdEdit, MdDeleteForever, MdPersonAdd, MdTimer } from 'react-icons/md';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { addSeconds, format } from 'date-fns';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import history from '~/services/history';
import api from '~/services/api';

import SelectInput from './SelectInput';
import { Loading, Container, Details, AddInformationForm } from './styles';
import { Form } from '~/components/DefaultStyle';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    overflowX: 'auto',
    marginBottom: '20px',
  },
  table: {
    minWidth: 450,
  },
}));

export default function ProjectDetails({ match }) {
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assign, setAssign] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);

  const profile = useSelector(state => state.user.profile);
  const classes = useStyles();

  function timeToSeconds(time) {
    const [hour, minute, second] = time.split(':').map(n => parseInt(n, 10));
    return second + minute * 60 + hour * 3600;
  }

  useEffect(() => {
    async function loadProject() {
      try {
        const response = await api.get(`/projects/${match.params.projectId}`);

        const data = {
          ...response.data,
          Assignments: response.data.Assignments.map(a => {
            a.totalHours = format(
              addSeconds(
                new Date(0, 0, 0, 0, 0, 0),
                a.Tasks.reduce((acc, cur) => {
                  return acc + timeToSeconds(cur.time);
                }, 0) - 60
              ),
              'HH:mm:ss'
            );
            return a;
          }),
        };

        const admin =
          response.data.Assignments.filter(
            a => a.users.id === profile.id && a.roles.id === 1
          ).length > 0;

        setProject({ ...data, admin });
        setLoading(false);
      } catch (err) {
        toast.error('Erro ao acessar os detalhes do Projeto');
        setLoading(false);
        history.push('/dashboard');
      }
    }
    loadProject();
  }, [match.params.projectId, profile.id, refresh]);

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

            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Participante</TableCell>
                    <TableCell align="left">Nível de Acesso</TableCell>
                    <TableCell align="right">Horas</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {project.Assignments.map(row => (
                    <TableRow key={row.id}>
                      <TableCell>{row.users.name}</TableCell>
                      <TableCell align="left">{row.roles.name}</TableCell>
                      <TableCell align="right">{row.totalHours}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
            <AddInformationForm>
              <div>
                {!assign ? (
                  <button
                    type="button"
                    onClick={loadSelectors}
                    className="user"
                  >
                    <MdPersonAdd size={20} color="#fff" />
                    Incluir Participante
                  </button>
                ) : (
                  <Form onSubmit={handleAddAssignment}>
                    <h4>Usuário:</h4>
                    <SelectInput name="user" data={users} />
                    <h4>Nível de Acesso:</h4>
                    <SelectInput name="role" data={roles} />
                    <button type="submit" className="user">
                      <MdPersonAdd size={20} color="#fff" />
                      Salvar
                    </button>
                  </Form>
                )}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => history.push(`/task/new/${project.id}`)}
                  className="task"
                >
                  <MdTimer size={20} color="#fff" />
                  Registrar Tempo
                </button>
              </div>
            </AddInformationForm>
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
