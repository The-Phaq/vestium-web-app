import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import newlooks from './newlooks/slice';
import figures from './figures/slice';
import items from './items/slice';
import colors from './colors/slice';
import user from './auth';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        newlooks,
        figures,
        items,
        colors,
        user: user.reducer,
    },
});
