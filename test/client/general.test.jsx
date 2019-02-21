import React from 'react';
import { shallow } from 'enzyme';
import App from 'app';

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
  test('checks that a new text appears in component after 2 seconds', (done) => {
    mockFetch();
    const wrapper = shallow(<App />);
    expect(wrapper.exists('div.report')).toBe(false);

    jest.advanceTimersByTime(2500);
    setImmediate(() => {
      expect(wrapper.exists('div.report')).toBe(true);
      expect(wrapper.find('div.report').text()).toBe('2-seconds-after-page-load');
      unmockFetch();
      done();
    });
  });

  test('interacts with component', (done) => {
    mockFetch();
    const wrapper = shallow(<App />);

    expect(wrapper.exists('div.report')).toBe(false);
    wrapper.find('button').simulate('click');
    jest.advanceTimersByTime(2500);
    wrapper.find('button').simulate('click');

    setImmediate(() => {
      const reports = wrapper.find('div.report').map(node => node.text());
      expect(reports).toEqual([
        'on-button-click',
        '2-seconds-after-page-load',
        'on-button-click',
      ]);
      unmockFetch();
      done();
    });
  });
});
