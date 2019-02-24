/* eslint-disable react/prop-types */

import React from 'react';
import { mount } from 'enzyme';

import App from 'app';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import initialState from 'app/initialState';
import reducers from 'app/reducers';

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

jest.useFakeTimers();

const mockFetch = () => {
  const mockFetchPromise = param => Promise.resolve({
    text: () => Promise.resolve(param),
  });

  global.fetch = (url) => {
    const param = url.substr(url.lastIndexOf('/') + 1);
    return mockFetchPromise(param);
  };
};

const unmockFetch = () => { global.fetch = undefined; };

describe('Example test', () => {
  test('checks that a new text appears in component after 2 seconds', () => {
    mockFetch();
    const store = createStore(reducers, initialState);
    const wrapper = mount(<Root store={store} />);

    expect(wrapper.exists('div.report')).toBe(false);

    jest.advanceTimersByTime(2500);
    wrapper.update();

    expect(wrapper.exists('div.report')).toBe(true);
    expect(wrapper.find('div.report').text()).toBe('{"code":200,"message":"OK: 2-seconds-after-page-load"}');
    unmockFetch();
  });

  test('interacts with component', () => {
    mockFetch();
    const store = createStore(reducers, initialState);
    const wrapper = mount(<Root store={store} />);

    expect(wrapper.exists('div.report')).toBe(false);
    wrapper.find('button').simulate('click');
    jest.advanceTimersByTime(2500);
    wrapper.find('button').simulate('click');

    const reports = wrapper.find('div.report').map(node => node.text());
    expect(reports).toEqual([
      '{"code":200,"message":"OK: on-button-click"}',
      '{"code":200,"message":"OK: 2-seconds-after-page-load"}',
      '{"code":200,"message":"OK: on-button-click"}',
    ]);
    unmockFetch();
  });
});
