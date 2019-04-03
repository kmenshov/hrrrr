/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import 'styles';
import App from 'app';
import initialState from 'app/initialState';
import reducers from 'app/reducers';
import saga from 'app/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, initialState, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
