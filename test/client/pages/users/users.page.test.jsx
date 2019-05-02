import React from 'react';
import { END } from 'redux-saga';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';

import Users from 'app/pages/users';

import connectComponent from '../../../helpers/connectComponent';
import { nextLoop } from '../../../helpers/asyncHelpers';

const dummyUsers = [
  { id: 1, name: 'User one' },
  { id: 2, name: 'User two' },
  { id: 3, name: 'User three' },
  { id: 4, name: 'User four' },
  { id: 5, name: 'User five' },
];

beforeAll(() => {
  fetchMock.get('/api/v0/users/', dummyUsers, { name: 'getUsers' });
});

afterAll(fetchMock.restore);

let Root, store; // eslint-disable-line

beforeEach(() => {
  // Enzyme .mount does not work correctly with arrays inside React Fragments, so wrap it in divs:
  ({ Root, store } = connectComponent(() => <div><Users /></div>));
});

afterEach(() => {
  store.dispatch(END);
});

describe('Users page', () => {
  test('fetches and lists users', async () => {
    const wrapper = mount(<Root />);
    await nextLoop(wrapper);

    dummyUsers.forEach(user => expect(
      wrapper.containsMatchingElement(<span>{user.name}</span>),
    ).toBe(true));

    expect(fetchMock.calls('getUsers').length).toBe(1);
  });

  test('creates a user', async () => {
    const newUserName = 'New user';

    fetchMock.post(
      '/api/v0/users/',
      (_url, opts) => ({ id: 777, name: JSON.parse(opts.body).name }),
      { name: 'createUser' },
    );

    const wrapper = mount(<Root />);
    await nextLoop(wrapper);
    expect(wrapper.containsMatchingElement(<span>{newUserName}</span>)).toBe(false);

    wrapper.find('form').find('#name').simulate('change', { target: { value: newUserName } });
    wrapper.find('form').simulate('submit');

    await nextLoop(wrapper);

    expect(wrapper.containsMatchingElement(<span>{newUserName}</span>)).toBe(true);
    expect(fetchMock.calls('createUser').length).toBe(1);
  });

  test('deletes users', async () => {
    const user1 = dummyUsers[1];
    const user2 = dummyUsers[3];

    fetchMock.delete('express:/api/v0/user/:id', 204, { name: 'deleteUser' });

    const wrapper = mount(<Root />);
    await nextLoop(wrapper);

    expect(wrapper.containsMatchingElement(<span>{user1.name}</span>)).toBe(true);
    expect(wrapper.containsMatchingElement(<span>{user2.name}</span>)).toBe(true);

    const user1comp = wrapper.find('div').filterWhere(n => n.contains(user1.name)).last();
    user1comp.find('button').simulate('click');

    const user2comp = wrapper.find('div').filterWhere(n => n.contains(user2.name)).last();
    user2comp.find('button').simulate('click');

    await nextLoop(wrapper);

    expect(wrapper.containsMatchingElement(<span>{user1.name}</span>)).toBe(false);
    expect(wrapper.containsMatchingElement(<span>{user2.name}</span>)).toBe(false);
    expect(fetchMock.calls('deleteUser').length).toBe(2);
  });
});
