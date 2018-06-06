/**
 * @file Client entry file.
 */

import App from '@/containers/App';
import * as reducers from '@/store';
import 'isomorphic-fetch';
import React from 'react';
import { hydrate, render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

// Set up the store.
const store = createStore(combineReducers(reducers), window.__INITIAL_STATE__ || {}, applyMiddleware(thunk));

const ConnectedIntlProvider = connect((state: any) => ({
  key: state.intl.locale,
  locale: state.intl.locale,
  messages: state.intl.translations,
}))(IntlProvider);

// Generator for base markup.
const markup = () => (
  <Provider store={store}>
    <ConnectedIntlProvider>
      <BrowserRouter>
        <Route render={(route: RouteComponentProps<any>) => (
          <App route={route}/>
        )}/>
      </BrowserRouter>
    </ConnectedIntlProvider>
  </Provider>
);

// Render the app.
if (process.env.NODE_ENV === `development`) {
  render(markup(), document.getElementById(`app`));
}
else {
  hydrate(markup(), document.getElementById(`app`));
}
