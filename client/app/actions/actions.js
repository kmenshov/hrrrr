/* eslint-disable import/prefer-default-export */

import { createAsyncAction } from './actionHelpers';
import * as type from './actionTypes';

export const testRequest = createAsyncAction(type.TEST_REQUEST);

export const fetchUsers = createAsyncAction(type.FETCH_USERS);
export const deleteUser = createAsyncAction(type.DELETE_USER);
