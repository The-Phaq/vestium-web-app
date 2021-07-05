import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import newlooks from './newlooks/slice';
import figures from './figures/slice';
import items from './items/slice';
import user from './auth';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        newlooks,
        figures,
        items,
        user: user.reducer,
    },
});
