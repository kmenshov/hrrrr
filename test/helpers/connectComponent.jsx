import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import initialState from 'app/initialState';
import reducers from 'app/reducers';
import saga from 'app/sagas';


const defaultOptions = {
  runSaga: true,
};

module.exports = function connectComponent(Component, options) {
  options = Object.assign(defaultOptions, options); // eslint-disable-line no-param-reassign
  const state = Object.assign(initialState, options.state);

  const sagaMiddleware = options.runSaga ? createSagaMiddleware() : undefined;
  const store = createStore(
    reducers,
    state,
    sagaMiddleware ? applyMiddleware(sagaMiddleware) : undefined,
  );
  if (options.runSaga) { sagaMiddleware.run(saga); }

  const Root = () => (
    <Provider store={store}>
      <MemoryRouter initialEntries={options.initialEntries}>
        <Component />
      </MemoryRouter>
    </Provider>
  );

  return ({
    store,
    Root,
  });
};
