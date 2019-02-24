import { all } from 'redux-saga/effects';
import reportsSagas from './reports';

export default function* rootSaga() {
  yield all([
    ...reportsSagas,
  ]);
}
