import { createAsyncThunk } from '@reduxjs/toolkit';
import { getConfigNewLookApi, getConfigCategoriesApi } from 'api/config';
// import api
import { apiWrapper } from 'utils/reduxUtils';

export const getConfigNewLook = createAsyncThunk(
  'config/getConfigNewLook',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(
        {},
        getConfigNewLookApi,
        payload,
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
)

export const getConfigCategories = createAsyncThunk(
  'config/getConfigCategories',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(
        {},
        getConfigCategoriesApi,
        payload,
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
)