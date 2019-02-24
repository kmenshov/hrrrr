/* global fetch */
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  ASYNC,
  TEST_REQUEST,
  testRequest,
} from 'app/actions';

function* testFetch({ payload }) {
  const response = yield call(fetch, `/api/v0/test/${payload}`);
  const text = yield call([response, 'text']);
  yield put(testRequest[ASYNC.success](text));
}

export default [
  takeEvery(TEST_REQUEST[ASYNC.request], testFetch),
];
