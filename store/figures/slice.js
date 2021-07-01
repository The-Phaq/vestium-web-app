import { createSlice } from '@reduxjs/toolkit';
import {
  getFigures,
} from './actions';

export const initialState = {
  data: {},
};

const { reducer } = createSlice({
  name: 'Figures',
  initialState,
  reducers: {},
  extraReducers: {
    [getFigures.fulfilled]: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export default reducer;
