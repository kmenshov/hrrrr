import { all } from 'redux-saga/effects';
import reportsSagas from './reports';
import usersSagas from './users';

export default function* rootSaga() {
  yield all([
    ...reportsSagas,
    ...usersSagas,
  ]);
}
