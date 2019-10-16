import { Alert } from 'react-native';
import { takeLatest, call, all, put } from 'redux-saga/effects';

import api from '~/services/api';

import {
  meetupsSuccess,
  meetupsFailure,
  meetupSubscribeSuccess,
} from './actions';

export function* getMeetups() {
  try {
    const response = yield call(api.get, 'meetups');

    const meetups = response.data;

    yield put(meetupsSuccess(meetups));
  } catch (err) {
    Alert.alert(
      'Erro ao buscar meetups',
      'Não foi possivel buscar as meetups, tente novamente mais tarde'
    );
    console.tron.log(err);
    yield put(meetupsFailure());
  }
}

export function* cancelMeetup({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `subscriptions/${id}`);

    Alert.alert(
      'Sucesso',
      'A inscrição para a Meetup foi cancelada com sucesso'
    );
    // toast.success('A Meetup foi cancelada com sucesso.', {
    //   onClose: () => history.push('/dashboard'),
    // });
  } catch (err) {
    // TODO: Pode ocorrer vários tipos de erros ao fazer essa requisição, identificar os erros para o usuário
    Alert.alert(
      'Erro ao cancelar meetup',
      'Não foi possivel cancelar a meetup'
    );
    console.tron.log(err);
  }
}

export function* subscribeMeetup({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.post, 'meetups', data);
    const meetup = response.data;

    yield put(meetupSubscribeSuccess(meetup));

    Alert.alert('Sucesso', 'Meetup criada com sucesso');
    // toast.success('Meetup criada com sucesso', {
    //   onClose: () => history.push(`/detail/${meetup.id}`),
    // });
  } catch (err) {
    Alert.alert(
      'Erro ao tentar criar meetup',
      'Não foi possível criar uma meetup'
    );
    console.tron.log(err);
  }
}

export default all([
  takeLatest('@meetups/MEETUPS_REQUEST', getMeetups),
  takeLatest('@meetups/MEETUPS_CANCEL_REQUEST', cancelMeetup),
  takeLatest('@meetups/MEETUP_SUBSCRIBE_REQUEST', subscribeMeetup),
]);
