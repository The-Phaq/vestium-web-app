import { makeActions } from 'store/crudCreator/actions';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  reactItemApi,
  deleteReactItemApi,
} from 'api/reacts';
// import api
import { apiWrapper } from 'utils/reduxUtils';

export const MODEL_NAME = 'items';
export const itemsActions = makeActions(MODEL_NAME);

export const getAllItems = itemsActions.getAll;
export const editItems = itemsActions.edit;
export const createItems = itemsActions.create;
export const getByIdItems = itemsActions.getDataById;
export const setCurrentItems = itemsActions.setCurrent;


const reactTypes = {
  LIKE: {
    type: 'likeCount',
    isDone: 'isLike',
  },
  SHARE: {
    type: 'shareCount',
    isDone: 'isShare',
  },
  FAVORITE: {
    type: 'favoriteCount',
    isDone: 'isFavorite',
  },
}

export const reactItem = createAsyncThunk(
  'items/reactItem',
  async (payload, thunkAPI) => {
    const { id, ...rest } = payload || {};
    try {
      await apiWrapper(
        {},
        reactItemApi,
        id,
        rest,
      );
      return {
        id,
        ...reactTypes[payload.actionType],
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
)

export const deleteReactItem = createAsyncThunk(
  'items/deleteReactItem',
  async (payload, thunkAPI) => {
    try {
      const { id, ...rest } = payload || {};
      await apiWrapper(
        {},
        deleteReactItemApi,
        id,
        rest,
      );
      return {
        id,
        ...reactTypes[payload.actionType],
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
)