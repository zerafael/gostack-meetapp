import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

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

export default all([takeLatest('@meetups/MEETUPS_REQUEST', getMeetups)]);
