import { createSelector } from 'reselect';

const getUserIdsList = state => state.users.allIds;
const getUsersData = state => state.users.byId;

////////////////////////////////////////////////////////////////////////////////
// EXPORTS:

export const getUsers = createSelector(
  [getUserIdsList, getUsersData],
  (userIdsList, usersData) => userIdsList.map(userId => usersData[userId]),
);
