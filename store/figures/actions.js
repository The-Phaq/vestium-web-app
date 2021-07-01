import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFiguresApi,
} from 'api/figures';
// import api
import { apiWrapper } from 'utils/reduxUtils';

export const getFigures = createAsyncThunk(
  'config/getFigures',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(
        {},
        getFiguresApi,
      )
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
)