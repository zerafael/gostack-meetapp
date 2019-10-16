import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  meetupsSuccess,
  meetupsFailure,
  meetupUpdateSuccess,
  meetupCreateSuccess,
} from './actions';

export function* getMeetups() {
  try {
    const response = yield call(api.get, 'organizing');

    const meetups = response.data;

    yield put(meetupsSuccess(meetups));
  } catch (err) {
    toast.error(
      'Não foi possivel buscar os meetups, tente novamente mais tarde'
    );
    console.tron.log(err);
    yield put(meetupsFailure());
  }
}

export function* cancelMeetup({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `meetups/${id}`);

    toast.success('A Meetup foi cancelada com sucesso.', {
      onClose: () => history.push('/dashboard'),
    });
  } catch (err) {
    // TODO: Pode ocorrer vários tipos de erros ao fazer essa requisição, identificar os erros para o usuário
    console.tron.log(err);
    toast.error('Não foi possível cancelar a meetup.');
  }
}

export function* updateMeetup({ payload }) {
  try {
    const { id, banner_id, ...rest } = payload.data;

    const meetup = { ...rest };

    if (banner_id) {
      meetup.banner_id = banner_id;
    }

    const response = yield call(api.put, `meetups/${id}`, meetup);

    yield put(meetupUpdateSuccess(response.data));
    toast.success('Meetup atualizada com sucesso');
  } catch (err) {
    // TODO: Pode ocorrer vários erros
    console.tron.log(err);
    toast.error('Erro ao atualizar as informações da meetup');
  }
}

export function* createMeetup({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.post, 'meetups', data);
    const meetup = response.data;

    yield put(meetupCreateSuccess(meetup));
    toast.success('Meetup criada com sucesso', {
      onClose: () => history.push(`/detail/${meetup.id}`),
    });
  } catch (err) {
    console.tron.log(err);
    toast.error('Não foi possível criar uma meetup');
  }
}

export default all([
  takeLatest('@meetups/MEETUPS_REQUEST', getMeetups),
  takeLatest('@meetups/MEETUPS_CANCEL_REQUEST', cancelMeetup),
  takeLatest('@meetups/MEETUP_UPDATE_REQUEST', updateMeetup),
  takeLatest('@meetups/MEETUP_CREATE_REQUEST', createMeetup),
]);
