import { createSlice } from '@reduxjs/toolkit';
import {
  getConfigNewLook,
  getConfigCategories,
} from './actions';

export const initialState = {
  data: [],
  category: {
    item: [],
    background: [],
    emoji: [],
  },
};

const { reducer } = createSlice({
  name: 'Config',
  initialState,
  reducers: {},
  extraReducers: {
    [getConfigNewLook.fulfilled]: (state, { payload }) => {
      state.data = payload;
    },
    [getConfigCategories.fulfilled]: (state, { payload }) => {
      state.category = payload;
    },
  },
});

export default reducer;
