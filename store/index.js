import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import newlooks from './newlooks/slice';
import figures from './figures/slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    newlooks,
    figures,
  },
});
