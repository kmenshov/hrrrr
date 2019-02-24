import { handleActions } from 'redux-actions';
import initialState from 'app/initialState';
import { ASYNC, TEST_REQUEST } from 'app/actions';

const reportsReducer = handleActions(
  {
    [TEST_REQUEST[ASYNC.success]]: (state, { payload }) => (
      [
        ...state,
        payload,
      ]
    ),
  },
  initialState.reports,
);

export default reportsReducer;
