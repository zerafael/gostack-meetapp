import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { MdControlPoint } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

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
    date: new Date(),
    banner: {
      url: '',
    },
  });
  const [meetupDate, setMeetupDate] = useState(meetup.date);
  const [description, setDescription] = useState(meetup.description);

  useEffect(() => {
    setDescription(meetup.description);
    setMeetupDate(
      typeof meetup.date === 'string' ? parseISO(meetup.date) : meetup.date
    );
  }, [meetup]);

  useEffect(() => {
    if (!newMeetup) {
      const { id } = match.params;

      setMeetup(meetups.find(m => m.id.toString() === id));
    }
  }, [match.params, meetups, newMeetup]);

  function handleSubmit(data) {
    const { banner_id, ...rest } = data;
    const newData = { id: meetup.id, ...rest };

    newData.date = meetupDate;

    if (banner_id) {
      newData.banner_id = banner_id;
    }

    if (newMeetup) {
      dispatch(meetupCreateRequest(newData));
      return;
    }
    dispatch(meetupUpdateRequest(newData));
  }

  return (
    <Container>
      <Form initialData={newMeetup ? null : meetup} onSubmit={handleSubmit}>
        <BannerInput name="banner_id" />
        <Input name="title" placeholder="Título do Meetup" />
        <Input
          multiline
          name="description"
          placeholder="Descrição completa"
          defaultValue={null}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <DatePicker
          className="datePicker"
          selected={meetupDate}
          onChange={date => setMeetupDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Horário"
          dateFormat="dd/MM/yyyy - HH:mm"
          locale={pt}
        />
        <Input name="location" placeholder="Localização" />
        <button className="saveButton" type="submit">
          <MdControlPoint size={22} />
          Salvar meetup
        </button>
      </Form>
    </Container>
  );
}

Edit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Edit;
