import React from 'react';
import { END } from 'redux-saga';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';

import App from 'app';

import connectComponent from '../../../helpers/connectComponent';
import { nextLoop } from '../../../helpers/asyncHelpers';

jest.useFakeTimers();

beforeAll(() => {
  fetchMock.mock('*', url => url.substr(url.lastIndexOf('/') + 1));
});

afterAll(fetchMock.restore);

let Root, store; // eslint-disable-line

beforeEach(() => {
  ({ Root, store } = connectComponent(App));
});

afterEach(() => {
  store.dispatch(END);
});

describe('Example test', () => {
  test('checks that a new text appears in component after 2 seconds', async () => {
    const wrapper = mount(<Root />);
    expect(wrapper.exists('div.report')).toBe(false);

    jest.advanceTimersByTime(2500);
    await nextLoop(wrapper);

    expect(wrapper.exists('div.report')).toBe(true);
    expect(wrapper.find('div.report').text()).toBe('2-seconds-after-page-load');
  });

  test('interacts with component', async () => {
    const wrapper = mount(<Root />);

    expect(wrapper.exists('div.report')).toBe(false);
    wrapper.find('button').simulate('click');
    jest.advanceTimersByTime(2500);
    wrapper.find('button').simulate('click');

    await nextLoop(wrapper);

    const reports = wrapper.find('div.report').map(node => node.text());
    expect(reports).toEqual([
      'on-button-click',
      '2-seconds-after-page-load',
      'on-button-click',
    ]);
  });
});
