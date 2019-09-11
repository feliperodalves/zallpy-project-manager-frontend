import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { MdAddCircle, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';

import { Container, List, Header } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('/organizer');

      if (!response) {
        return;
      }
      const result = response.data.map(meetup => ({
        ...meetup,
        dateFormatted: format(
          parseISO(meetup.datetime),
          "d 'de' MMMM', às' HH'h'",
          {
            locale: pt,
          }
        ),
      }));

      setMeetups(result);
    }
    loadMeetups();
  }, []);

  return (
    <Container>
      <Header>
        <h1>oi</h1>
        <button type="button" onClick={() => history.push('/project/new')}>
          <MdAddCircle size={20} color="#fff" />
          Novo Projeto
        </button>
      </Header>
    </Container>
  );
}
