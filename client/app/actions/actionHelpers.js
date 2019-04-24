import { createAction } from 'redux-actions';

export const ASYNC = { request: 'REQUEST', success: 'SUCCESS', failure: 'FAILURE' };

export function createAsyncActionType(baseActionType) {
  return Object.values(ASYNC).reduce((accumulator, asyncEvent) => {
    accumulator[asyncEvent] = `${baseActionType}:${asyncEvent}`;
    return accumulator;
  }, {});
}

export function createAsyncAction(asyncActionType) {
  return Object.entries(asyncActionType).reduce((accumulator, asyncEvent) => {
    accumulator[asyncEvent[0]] = createAction(asyncEvent[1]);
    return accumulator;
  }, {});
}
