/* eslint-disable */
import each from 'lodash/each';
import { notification } from 'antd';
import { createAction } from '@reduxjs/toolkit';

export function makeConstantCreator(...params) {
  const constant = {};
  each(params, (param) => {
    constant[param] = param;
  });
  return constant;
}

export const makeActionCreator = (type, params = null) => ({ type, ...params });

export const makeReducerCreator = (initialState = null, handlers = {}) => (
  state = initialState,
  action,
) => {
  if (!action && !action.type) {
    return state;
  }
  const handler = handlers[action.type];
  return (handler && handler(state, action)) || state;
};

export async function apiWrapper(
  options = {
    isShowLoading: true,
    isShowSuccess: false,
    dontShowError: false,
  },
  apiFunction,
  ...payload
) {
  try {
    if (options.isShowLoading) {
      // showProgress();
    }
    const response = await apiFunction(...payload);
    if (options.isShowLoading) {
      setTimeout(() => {
        // showProgress(false);
      }, 0);
    }
    if (options.isShowSuccess) {
      process.browser &&
        notification?.success({
          message: 'Success',
          description:
            response.message || options.successDescription || 'success',
        });
    }
    return response;
  } catch (error) {
    process.browser && notification.destroy();
    process.browser &&
      error?.statusCode !== 401 &&
      !options.dontShowError &&
      notification.error({
        message: 'Oops!',
        description: error.message || error || 'some thing wrong!',
      });
    if (options.isShowLoading) {
      // showProgress(false);
    }

    throw error;
  }
}
