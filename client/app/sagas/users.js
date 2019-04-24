/* global fetch */

import { call, put, takeEvery } from 'redux-saga/effects';
import {
  ASYNC,
  FETCH_USERS,
  DELETE_USER,
  fetchUsers,
  deleteUser,
} from 'app/actions';

function* fetchUsersRequest() {
  const response = yield call(fetch, '/api/v0/users/');
  if (response.ok) {
    const json = yield call([response, 'json']);
    yield put(fetchUsers[ASYNC.success](json));
  } else {
    yield put(fetchUsers[ASYNC.failure]());
  }
}

function* deleteUserRequest({ payload }) {
  const response = yield call(
    fetch,
    `/api/v0/user/${payload}`,
    { method: 'DELETE' },
  );
  if (response.ok) {
    yield put(deleteUser[ASYNC.success](payload));
  } else {
    yield put(deleteUser[ASYNC.failure](payload));
  }
}

export default [
  takeEvery(FETCH_USERS[ASYNC.request], fetchUsersRequest),
  takeEvery(DELETE_USER[ASYNC.request], deleteUserRequest),
];
