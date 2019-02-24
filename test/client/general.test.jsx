/* eslint-disable react/prop-types */

import React from 'react';
import { mount } from 'enzyme';

import App from 'app';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware, { END } from 'redux-saga';
import initialState from 'app/initialState';
import reducers from 'app/reducers';
import saga from 'app/sagas';

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

let Root, store; // eslint-disable-line

beforeAll(mockFetch);

afterAll(unmockFetch);

beforeEach(() => {
  const sagaMiddleware = createSagaMiddleware();
  store = createStore(reducers, initialState, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(saga);
  Root = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );
});

afterEach(() => {
  store.dispatch(END);
});

describe('Example test', () => {
  test('checks that a new text appears in component after 2 seconds', (done) => {
    const wrapper = mount(<Root />);

    expect(wrapper.exists('div.report')).toBe(false);

    jest.advanceTimersByTime(2500);

    setImmediate(() => {
      wrapper.update();
      expect(wrapper.exists('div.report')).toBe(true);
      expect(wrapper.find('div.report').text()).toBe('2-seconds-after-page-load');
      done();
    });
  });

  test('interacts with component', (done) => {
    const wrapper = mount(<Root />);

    expect(wrapper.exists('div.report')).toBe(false);
    wrapper.find('button').simulate('click');
    jest.advanceTimersByTime(2500);
    wrapper.find('button').simulate('click');

    setImmediate(() => {
      wrapper.update();
      const reports = wrapper.find('div.report').map(node => node.text());
      expect(reports).toEqual([
        'on-button-click',
        '2-seconds-after-page-load',
        'on-button-click',
      ]);
      done();
    });
  });
});
