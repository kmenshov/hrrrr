import React from 'react';
import { mount } from 'enzyme';

import App from 'app';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

let Root;
beforeEach(() => {
  const mockStore = configureStore();
  Root = () => (
    <Provider store={mockStore()}>
      <App />
    </Provider>
  );
});

describe('top level React Routes', () => {
  test('/users renders the Users page', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/users']}>
        <Root />
      </MemoryRouter>,
    );

    expect(wrapper.containsMatchingElement(<div>Here will be the Users page.</div>)).toBe(true);
    expect(wrapper.exists('button')).toBe(false);
  });

  test('/ renders the Home page', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <Root />
      </MemoryRouter>,
    );

    expect(wrapper.containsMatchingElement(<div>Here will be the Users page.</div>)).toBe(false);
    expect(wrapper.exists('button')).toBe(true);
  });

  test('unknown URLs redirect to 404', () => {
    delete window.location;

    window.location = {};
    mount(
      <MemoryRouter initialEntries={['/something']}>
        <Root />
      </MemoryRouter>,
    );

    expect(window.location).toEqual({ href: '/404.html' });

    window.location = {};
    mount(
      <MemoryRouter initialEntries={['/something/else/entirely/']}>
        <Root />
      </MemoryRouter>,
    );

    expect(window.location).toEqual({ href: '/404.html' });
  });
});
