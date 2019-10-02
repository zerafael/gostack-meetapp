import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { MdControlPoint, MdChevronRight } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Meetup } from './styles';

function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('/organizing');

      setMeetups(response.data);

      console.tron.log(meetups);
    }

    loadMeetups();
  }, [meetups]);

  // TODO: melhorar a formatação de data
  function formatDate(date) {
    return format(parseISO(date), "dd 'de' MMMM ', às' HH'h'", {
      locale: pt,
    });
  }

  function handleNewMeetup() {
    history.push('/new');
  }

  return (
    <Container>
      <header>
        <strong>Meus meetups</strong>
        <button type="button" onClick={handleNewMeetup}>
          <MdControlPoint size={22} />
          Novo meetup
        </button>
      </header>

      <ul>
        {meetups.map(meetup => (
          <Meetup>
            <strong>{meetup.title}</strong>
            <div>
              <span>{formatDate(meetup.date)}</span>
              <MdChevronRight size={28} color="#fff" />
            </div>
          </Meetup>
        ))}
      </ul>
    </Container>
  );
}

export default Dashboard;
