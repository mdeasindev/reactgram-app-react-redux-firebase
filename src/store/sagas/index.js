import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import {
  createAccount,
  letsLogin,
  letsLogout,
  sharePost,
  likeStory,
} from '../../api';
import {
  registerSuccess,
  registerFailed,
  loginSuccess,
  loginFailed,
} from '../Actions/authAction';

import { shareSuccess, shareError } from '../Actions/reactGramAction';

import { LOGIN, REGISTER, LOGOUT, REACTGRAM } from '../../constants';

function* createAccountWorker(action) {
  const response = yield call(createAccount, action.payload);

  if (response && response.message) {
    yield put(registerFailed(response.message));
  } else {
    yield put(registerSuccess());
  }
}

function* loginWorker(action) {
  const response = yield call(letsLogin, action.payload);

  if (response.message) {
    yield put(loginFailed(response.message));
  } else {
    yield put(loginSuccess());
  }
}

function* logoutWorker(action) {
  const response = yield call(letsLogout);
  if (response) {
    yield put({ type: LOGOUT.SUCCESS });
  }
}

function* shareWorker(action) {
  const response = yield call(sharePost, action.payload);

  if (response.state === 'success') {
    yield put(shareSuccess(response));
  } else {
    yield put(shareError(response));
  }
}

function* likeWorker(action) {
  yield call(likeStory, action.doc_id, action.u_id);
}

function* mySagas() {
  yield takeEvery(REGISTER.SUBMIT, createAccountWorker);
  yield takeEvery(LOGIN.SUBMIT, loginWorker);
  yield takeLatest(LOGOUT.DONE, logoutWorker);
  yield takeLatest(REACTGRAM.SHARE, shareWorker);
  yield takeEvery(REACTGRAM.LIKE, likeWorker);
}

export default mySagas;
