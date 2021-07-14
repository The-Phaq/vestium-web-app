import { makeActions } from 'store/crudCreator/actions';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
} from 'api/user';
import {
  reactNewLookApi,
  deleteReactNewLookApi,
} from 'api/reacts';
// import api
import { apiWrapper } from 'utils/reduxUtils';

export const getUser = createAsyncThunk(
  'newlooks/getUser',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(
        {},
        getUserApi,
        payload,
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
)

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

export const reactNewLook = createAsyncThunk(
  'newlooks/reactNewLook',
  async (payload, thunkAPI) => {
    const { id, ...rest } = payload || {};
    try {
      await apiWrapper(
        {},
        reactNewLookApi,
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
export const deleteReactNewLook = createAsyncThunk(
  'newlooks/deleteReactNewLook',
  async (payload, thunkAPI) => {
    try {
      const { id, ...rest } = payload || {};
      await apiWrapper(
        {},
        deleteReactNewLookApi,
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

export const MODEL_NAME = 'newlooks';
export const newlooksActions = makeActions(MODEL_NAME);

export const getAllNewlooks = newlooksActions.getAll;
export const editNewlooks = newlooksActions.edit;
export const createNewlooks = newlooksActions.create;
export const getByIdNewlooks = newlooksActions.getDataById;
export const setCurrentNewlooks = newlooksActions.setCurrent;