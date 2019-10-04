import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import {
  MdModeEdit,
  MdDeleteForever,
  MdInsertInvitation,
  MdPlace,
} from 'react-icons/md';

import history from '~/services/history';

import { meetupCancelRequest } from '~/store/modules/meetups/actions';

import { Container, Meetup } from './styles';

function Detail({ match }) {
  const dispatch = useDispatch();
  const meetups = useSelector(state => state.meetups.meetups);
  const [meetup, setMeetup] = useState({
    id: 0,
    title: '',
    description: '',
    location: '',
    date: new Date().toISOString(),
    banner: {
      url: '',
    },
  });

  useEffect(() => {
    const { id } = match.params;

    setMeetup(meetups.find(m => m.id.toString() === id));
  }, [match.params, meetup, meetups]);

  function formatDate(date) {
    return format(parseISO(date), "dd 'de' MMMM ', às' HH'h'", {
      locale: pt,
    });
  }

  function handleEdit({ id }) {
    history.push(`/edit/${id}`);
  }

  function handleCancel({ id }) {
    dispatch(meetupCancelRequest(id));
  }

  return (
    <Container>
      <header>
        <strong>{meetup.title}</strong>
        <div>
          <button
            type="button"
            className="edit"
            onClick={() => handleEdit(meetup)}
          >
            <MdModeEdit size={22} />
            Editar
          </button>
          <button
            type="button"
            className="cancel"
            onClick={() => handleCancel(meetup)}
          >
            <MdDeleteForever size={22} />
            Cancelar
          </button>
        </div>
      </header>
      <Meetup>
        <img src={meetup.banner.url} alt="MeetUp" />
        <p>{meetup.description}</p>
        <footer>
          <span>
            <MdInsertInvitation size={22} />
            {formatDate(meetup.date)}
          </span>
          <span>
            <MdPlace size={22} />
            {meetup.location}
          </span>
        </footer>
      </Meetup>
    </Container>
  );
}

export default Detail;
