import { Alert } from 'react-native';
import { takeLatest, all, call, put } from 'redux-saga/effects';

import api from '~/services/api';

import {
  subscriptionsSuccess,
  subscribeSuccess,
  subscribeFailure,
  unsubscribeSuccess,
} from './actions';

export function* getSubscriptions() {
  try {
    const response = yield call(api.get, 'subscriptions');

    yield put(subscriptionsSuccess(response.data));
  } catch (err) {
    Alert.alert('Erro', err.response.data.error);
  }
}

export function* subscribeMeetup({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.post, `subscription/${id}`);

    Alert.alert('Sucesso', 'Inscrição feita com sucesso');

    yield put(subscribeSuccess(response.data));
  } catch (err) {
    Alert.alert('Erro', err.response.data.error);
    yield put(subscribeFailure());
  }
}

export function* unsubscribeMeetup({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `subscription/${id}`);

    Alert.alert('Sucesso', 'Inscrição cancelada com sucesso');

    yield put(unsubscribeSuccess(id));
  } catch (err) {
    Alert.alert('Erro', err.response.data.error);
  }
}

export default all([
  takeLatest('@subscriptions/SUBSCRIBE_REQUEST', subscribeMeetup),
  takeLatest('@subscriptions/SUBSCRIPTIONS_REQUEST', getSubscriptions),
  takeLatest('@subscription/UNSUBSCRIBE_REQUEST', unsubscribeMeetup),
]);
