import { createSlice } from '@reduxjs/toolkit';
import {
  getConfigNewLook,
  getConfigCategories,
  getConfigBoutique,
} from './actions';

export const initialState = {
  data: [],
  boutiqueData: [],
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
    [getConfigBoutique.fulfilled]: (state, { payload }) => {
      state.boutiqueData = payload;
    },
    [getConfigCategories.fulfilled]: (state, { payload }) => {
      state.category = payload;
    },
  },
});

export default reducer;
