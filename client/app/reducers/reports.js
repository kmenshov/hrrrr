import initialState from 'app/initialState';
import { TEST_REQUEST } from 'app/actions';

export default function reportsReducer(state = initialState.reports, action) {
  switch (action.type) {
    case TEST_REQUEST:
      return [
        ...state,
        action.param,
      ];
    default:
      return state;
  }
}
