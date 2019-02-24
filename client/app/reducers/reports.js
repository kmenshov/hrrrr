import { handleActions } from 'redux-actions';
import initialState from 'app/initialState';
import { TEST_REQUEST } from 'app/actions';

const reportsReducer = handleActions(
  {
    [TEST_REQUEST]: (state, { payload }) => (
      [
        ...state,
        payload,
      ]
    ),
  },
  initialState.reports,
);

export default reportsReducer;
