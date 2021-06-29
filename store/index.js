import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import newlooks from './newlooks/slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    newlooks,
  },
});
