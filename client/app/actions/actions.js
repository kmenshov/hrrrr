/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';
import { TEST_REQUEST } from './actionTypes';

export const testRequest = createAction(TEST_REQUEST);
