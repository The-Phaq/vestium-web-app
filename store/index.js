import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { setInitHeader } from 'utils/request';
import omit from 'lodash/omit';
import counterReducer from './counter';
import newlooks from './newlooks/slice';
import favorites from './favorites/slice';
import figures from './figures/slice';
import items from './items/slice';
import emojis from './emojis/slice';
import backgrounds from './backgrounds/slice';
import myCreations from './myCreations/slice';
import colors from './colors/slice';
import user from './auth';
import config from './config/slice';

const rootReducer = combineReducers({
    counter: counterReducer,
    newlooks,
    favorites,
    config,
    figures,
    items,
    emojis,
    backgrounds,
    myCreations,
    colors,
    user: user.reducer,
})

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
      return rootReducer({
        ...state, // use previous state
        ...omit(action.payload, ['figures', 'user', 'config']), // apply delta from hydration
      }, action);
    }
    return rootReducer(state, action);
  };

export const store = configureStore({
    reducer,
});

const makeStore = () => {
    if (process.browser) {
      setInitHeader();
    }
    return store;
  };

export const wrapper = createWrapper(makeStore);
  