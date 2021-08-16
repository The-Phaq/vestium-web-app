/* eslint-disable */
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { apiWrapper } from 'utils/reduxUtils';
import { getAllApi, getDataByIdApi, postApi, putApi, delApi } from 'api/crud';
import {
  convertRequestParams,
  convertResponseData,
  PRIMARY_KEY,
} from './dataProvider';

export const getAll = (resource, customApiResource, primaryKey = PRIMARY_KEY) =>
  createAsyncThunk(`${resource}/getAll`, async (payload, thunkAPI) => {
    try {
      const { data = {}, options = {} } = payload;
      const { pageSize, page, includes, filter } = thunkAPI.getState()[
        resource
      ];
      const convertRequest = convertRequestParams(
        'GET_ALL',
        {
          limit: pageSize,
          offset: pageSize * (page - 1),
          filter,
          includes,
          ...data,
        },
        resource,
      );
      const response = await apiWrapper(
        { isShowProgress: options.isShowProgress },
        getAllApi,
        options.customApiResource || customApiResource || resource,
        convertRequest,
      );
      const result = convertResponseData('GET_ALL', response, { primaryKey });
      if (result.data) {
        return {
          data: {
            // numberOfPages: Math.round(result.total / pageSize),
            ...result,
          },
          options,
        };
      }
      return thunkAPI.rejectWithValue({ data: response, options });
    } catch (error) {
      return thunkAPI.rejectWithValue({});
    }
  });

export const getDataById = (resource, customApiResource, primaryKey = PRIMARY_KEY) =>
  createAsyncThunk(`${resource}/getDataById`, async (payload, thunkAPI) => {
    const { data, options = { extraParams: {}, isRequestApi: true } } = payload;
    try {
      if (!options.isRequestApi) {
        return { data };
      }
      const response = await apiWrapper(
        { isShowProgress: options.isShowProgress },
        getDataByIdApi,
        options.customApiResource || customApiResource || resource,
        data[PRIMARY_KEY],
        options.extraParams,
      );
      const result = convertResponseData('GET_BY_ID', response, { primaryKey });
      if (result) {
        return { data: result };
      }
      return thunkAPI.rejectWithValue({ data: {
        ...data,
        ...result,
      }, options });
    } catch (error) {
      return thunkAPI.rejectWithValue({ data: {
        ...data,
        ...error
      }, options });
    }
  });

export const edit = (resource, customApiResource, primaryKey = PRIMARY_KEY) =>
  createAsyncThunk(`${resource}/edit`, async (payload, thunkAPI) => {
    const { data, options = {} } = payload;
    try {
      const requestData = convertRequestParams('EDIT', data, { primaryKey });
      const response = await apiWrapper(
        { isShowProgress: options.isShowProgress },
        putApi,
        options.customApiResource || customApiResource || resource,
        data[PRIMARY_KEY],
        requestData,
      );
      const result = convertResponseData('EDIT', response, { primaryKey });

      if (result) {
        return { data: { ...data, ...result } };
      }
      return thunkAPI.rejectWithValue({
        error: true,
        data: { ...data, ...response },
      });
    } catch (error) {
      return thunkAPI.rejectWithValue({ data, error: true, options });
      //
    }
  });

export const create = (resource, customApiResource) =>
  createAsyncThunk(`${resource}/create`, async (payload, thunkAPI) => {
    const { data, options = {} } = payload;
    try {
      const response = await apiWrapper(
        { isShowProgress: options.isShowProgress, ...options },
        postApi,
        options.customApiResource || customApiResource || resource,
        data,
      );
      const result = convertResponseData('CREATE', response);
      if (result) {
        return { data: result };
      }
      return thunkAPI.rejectWithValue({ error: true, data: response });
    } catch (error) {
      return thunkAPI.rejectWithValue({ data: error, error: true });
    }
  });

export const del = (resource, customApiResource, primaryKey = PRIMARY_KEY) =>
  createAsyncThunk(`${resource}/del`, async (payload, thunkAPI) => {
    const { data, options = {} } = payload;
    try {
      const response = await apiWrapper(
        { isShowProgress: true },
        delApi,
        options.customApiResource || customApiResource || resource,
        data.path || data[PRIMARY_KEY],
      );
      const result = convertResponseData('DELETE', response, { primaryKey });
      if (result.success || result.data?.message === 'OK' || result.message === 'OK') {
        return { data };
      }
      return thunkAPI.rejectWithValue({ data: response });
    } catch (error) {
      return thunkAPI.rejectWithValue({ options, data, error });
    }
  });

export const clearCurrent = (resource) =>
  createAction(`${resource}/clearCurrent`);

export const makeActions = (resource, customApiResource, primaryKey) => ({
  getAll: getAll(resource, customApiResource, primaryKey),
  getDataById: getDataById(resource, customApiResource, primaryKey),
  edit: edit(resource, customApiResource, primaryKey),
  create: create(resource, customApiResource, primaryKey),
  del: del(resource, customApiResource, primaryKey),
  clearCurrent: clearCurrent(resource, customApiResource, primaryKey),
});
