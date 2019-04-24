import { handleActions } from 'redux-actions';
import initialState from 'app/initialState';
import { ASYNC, FETCH_USERS, DELETE_USER } from 'app/actions';
import { arrayToNormalized, deleteFromNormalized } from 'app/helpers/normalization';

/* TODO:
  - add error handling;
*/

const reportsReducer = handleActions(
  {
    [FETCH_USERS[ASYNC.success]]: (state, { payload }) => arrayToNormalized(payload),
    [DELETE_USER[ASYNC.success]]: (state, { payload }) => deleteFromNormalized(state, payload),
  },
  initialState.users,
);

export default reportsReducer;
