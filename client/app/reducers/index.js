import { combineReducers } from 'redux';

import { emptyNormalizedObject } from 'app/helpers/normalization';
import reports from './reports';
import users from './users';

// To avoid Redux warning 'Unexpected keys will be ignored':
const stubNormalizedBranch = (state = emptyNormalizedObject) => state; // eslint-disable-line no-unused-vars

export default combineReducers({
  reports,
  users,
});
