import { createAsyncActionType } from './actionHelpers';

export const TEST_REQUEST = createAsyncActionType('TEST_REQUEST');

export const FETCH_USERS = createAsyncActionType('FETCH_USERS');
export const DELETE_USER = createAsyncActionType('DELETE_USER');
