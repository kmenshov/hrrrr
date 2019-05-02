import { handleActions } from 'redux-actions';
import initialState from 'app/initialState';
import { ASYNC, FETCH_USERS, CREATE_USER, DELETE_USER } from 'app/actions';
import {
  arrayToNormalized,
  addOrReplaceInNormalized,
  deleteFromNormalized,
} from 'app/helpers/normalization';

/* TODO:
  - add error handling;
*/

const reportsReducer = handleActions(
  {
    [FETCH_USERS[ASYNC.success]]: (state, { payload }) => arrayToNormalized(payload),
    [CREATE_USER[ASYNC.success]]: (state, { payload }) => addOrReplaceInNormalized(state, payload),
    [DELETE_USER[ASYNC.success]]: (state, { payload }) => deleteFromNormalized(state, payload),
  },
  initialState.users,
);

export default reportsReducer;
