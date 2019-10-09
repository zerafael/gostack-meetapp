import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { MdControlPoint, MdChevronRight } from 'react-icons/md';

import history from '~/services/history';

import { meetupsRequest } from '~/store/modules/meetups/actions';

import { Container, Meetup } from './styles';

function Dashboard() {
  const dispatch = useDispatch();
  const meetups = useSelector(state => state.meetups.meetups);
  const loading = useSelector(state => state.meetups.loading);

  useEffect(() => {
    dispatch(meetupsRequest());
  }, [dispatch]);

  function formatDate(date) {
    return format(parseISO(date), "dd 'de' MMMM ', às' HH'h'", {
      locale: pt,
    });
  }

  function handleNewMeetup() {
    history.push('/new');
  }

  function handleDetail(meetup) {
    history.push(`/detail/${meetup.id}`);
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

      {loading ? (
        <h1>Carregando...</h1>
      ) : (
        <ul>
          {meetups.map(meetup => (
            <Meetup onClick={() => handleDetail(meetup)}>
              <strong>{meetup.title}</strong>
              <div>
                <span>{formatDate(meetup.date)}</span>
                <MdChevronRight size={28} color="#fff" />
              </div>
            </Meetup>
          ))}
        </ul>
      )}
    </Container>
  );
}

export default Dashboard;
