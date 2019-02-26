import intl from '@/store/intl';
import users from '@/store/users';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = process.env.NODE_ENV === 'development' && __APP_ENV__ === 'client' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const reducer = combineReducers({ intl, users });

export default createStore(reducer, __APP_ENV__ === 'client' && window.__INITIAL_STATE__ || {}, composeEnhancers(applyMiddleware(thunk)));