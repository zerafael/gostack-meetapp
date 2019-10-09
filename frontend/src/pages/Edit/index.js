import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdControlPoint } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import {
  meetupUpdateRequest,
  meetupCreateRequest,
} from '~/store/modules/meetups/actions';

import BannerInput from './BannerInput';

import { Container } from './styles';

function Edit({ match }) {
  const dispatch = useDispatch();
  const newMeetup = match.path === '/new';
  const meetups = useSelector(state => state.meetups.meetups);
  const [meetup, setMeetup] = useState({
    id: 0,
    title: '',
    description: '',
    location: '',
    date: '',
    banner: {
      url: '',
    },
  });

  useEffect(() => {
    if (!newMeetup) {
      const { id } = match.params;

      setMeetup(meetups.find(m => m.id.toString() === id));
    }
  }, [match.params, meetups, newMeetup]);

  function handleSubmit(data) {
    const { banner_id, ...rest } = data;
    const newData = { id: meetup.id, ...rest };

    if (banner_id) {
      newData.banner_id = banner_id;
    }

    if (newMeetup) {
      dispatch(meetupCreateRequest(newData));
      return;
    }
    dispatch(meetupUpdateRequest(newData));
  }
  // TODO: Corrigir formatação da data e método de inserção da data
  // TODO (Verificar dashboard do gobarber web)
  return (
    <Container>
      <Form initialData={newMeetup ? null : meetup} onSubmit={handleSubmit}>
        <BannerInput name="banner_id" />
        <Input name="title" placeholder="Título do Meetup" />
        <Input
          multiline
          name="description"
          placeholder="Descrição completa"
          value={newMeetup ? null : meetup.description}
        />

        <Input name="date" placeholder="Data do meetup" />
        <Input name="location" placeholder="Localização" />
        <button type="submit">
          <MdControlPoint size={22} />
          Salvar meetup
        </button>
      </Form>
    </Container>
  );
}

export default Edit;
