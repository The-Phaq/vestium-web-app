import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { setInitHeader } from 'utils/request';
import omit from 'lodash/omit';
import counterReducer from './counter';
import newlooks from './newlooks/slice';
import figures from './figures/slice';
import items from './items/slice';
import colors from './colors/slice';
import user from './auth';

const rootReducer = combineReducers({
    counter: counterReducer,
    newlooks,
    figures,
    items,
    colors,
    user: user.reducer,
})

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
      return rootReducer({
        ...state, // use previous state
        ...omit(action.payload, ['figures', 'user']), // apply delta from hydration
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
  