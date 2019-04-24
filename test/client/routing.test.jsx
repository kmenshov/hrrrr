import React from 'react';
import { mount } from 'enzyme';

import App from 'app';
import { arrayToNormalized } from 'app/helpers/normalization';

import connectComponent from '../helpers/connectComponent';

const dummyUsers = arrayToNormalized([
  { id: 1, name: 'User One' },
  { id: 2, name: 'User Two' },
]);

describe('top level React Routes', () => {
  test('/users renders the Users page', () => {
    const { Root } = connectComponent(
      App,
      { runSaga: false, initialEntries: ['/users'], state: { users: dummyUsers } },
    );
    const wrapper = mount(<div><Root /></div>);
    const button = wrapper.find('button').at(0);

    expect(wrapper.containsMatchingElement(<span>User Two</span>)).toBe(true);
    expect(button.text()).toBe('Delete');
  });

  test('/ renders the Home page', () => {
    const { Root } = connectComponent(App, { runSaga: false, initialEntries: ['/'] });
    const wrapper = mount(<Root />);
    const button = wrapper.find('button').at(0);

    expect(wrapper.containsMatchingElement(<span>User Two</span>)).toBe(false);
    expect(button.text()).toBe('Click Me!');
  });

  test('unknown URLs redirect to 404', () => {
    delete window.location;

    window.location = {};
    let { Root } = connectComponent(App, { runSaga: false, initialEntries: ['/something'] });
    mount(<Root />);
    expect(window.location).toEqual({ href: '/404.html' });

    window.location = {};
    ({ Root } = connectComponent(App, { runSaga: false, initialEntries: ['/something/else/entirely/'] }));
    mount(<Root />);
    expect(window.location).toEqual({ href: '/404.html' });
  });
});
