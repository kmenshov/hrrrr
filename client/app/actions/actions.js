/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';
import { TEST_REQUEST } from './actionTypes';

function createAsyncAction(asyncActionType) {
  return Object.entries(asyncActionType).reduce((accumulator, asyncEvent) => {
    accumulator[asyncEvent[0]] = createAction(asyncEvent[1]);
    return accumulator;
  }, {});
}

export const testRequest = createAsyncAction(TEST_REQUEST);
