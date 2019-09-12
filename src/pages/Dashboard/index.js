import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MdAddCircle } from 'react-icons/md';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { Container, Loading } from './styles';
import history from '~/services/history';
import api from '~/services/api';

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
  },
  h: {
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    fontSize: 14,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    async function loadProjects() {
      const response = await api.get('/projects');

      if (!response) {
        return;
      }
      setProjects(response.data);
      setLoading(false);
    }
    loadProjects();
  }, []);

  return loading ? (
    <Loading>Carregando...</Loading>
  ) : (
    <Container>
      <header>
        <h1>Dashboard de Projetos</h1>
        <button type="button" onClick={() => history.push('/project/new')}>
          <MdAddCircle size={20} color="#fff" />
          Novo Projeto
        </button>
      </header>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {projects.map(project => (
              <Grid key={project.id} item>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="h2"
                      className={classes.h}
                    >
                      {project.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {project.users} usuário(s) designado(s) ao projeto
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {project.workedTime ? (
                        <>
                          Horas registradas:
                          <strong>{project.workedTime}</strong>
                        </>
                      ) : (
                        <>Não foram registradas nenhuma atividade no projeto</>
                      )}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <button
                      type="button"
                      onClick={() =>
                        history.push(`/project/details/${project.id}`)
                      }
                    >
                      Ver Detalhes
                    </button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {projects ? (
        <></>
      ) : (
        <Loading>
          O projeto não existe
          <Link to="/dashboard">Clique aqui para voltar</Link>
        </Loading>
      )}
    </Container>
  );
}
