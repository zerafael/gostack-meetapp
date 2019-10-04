import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { meetupsSuccess, meetupsFailure } from './actions';

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
    console.tron.log('Entrou aqui');
    yield call(api.delete, `meetups/${id}`);

    toast.success('A Meetup foi cancelada com sucesso.', {
      onClose: () => history.push('/dashboard'),
    });
  } catch (err) {
    // TODO: Pode ocorrer vários tipos de erros ao fazer essa requisição, identificar os erros para o usuário
    toast.error('Não foi possível cancelar a meetup.');
  }
}

export default all([
  takeLatest('@meetups/MEETUPS_REQUEST', getMeetups),
  takeLatest('@meetups/MEETUPS_CANCEL_REQUEST', cancelMeetup),
]);
