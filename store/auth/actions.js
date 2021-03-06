import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiWrapper } from 'utils/reduxUtils';
import { message } from "antd";
import {
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchProfile,
  forgotPasswordApi,
  resetPasswordApi,
  loginWithFacebookApi,
  loginWithGoogleApi,
} from "../../api/user";
import {
  loginWithGoogleFirebaseApi,
  loginWithFacebookFirebaseApi,
} from '../../api/firebase';
import slice from "./index";

const { loginSuccess, logoutSuccess, loginFetch, loginFailed, profileSuccess } =
  slice.actions;

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(
        {
          isShowSuccess: true,
        },
        forgotPasswordApi,
        payload,
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(
        {
          isShowSuccess: true,
        },
        resetPasswordApi,
        payload,
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const login =
  ({ username, password }) =>
  async (dispatch) => {
    dispatch(loginFetch());
    try {
      const res = await fetchLogin({ email: username, password });

      fetch('/api/token', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: res?.accessToken,
        }),
      })
      dispatch(loginSuccess(res));
    } catch (e) {
      message.error(e.message);
      dispatch(loginFailed());
      return console.error(e.message);
    }
  };
export const registerAction = (data) => async (dispatch) => {
  dispatch(loginFetch());
  try {
    const res = await register(data);

    fetch('/api/token', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: res?.accessToken,
      }),
    })
    dispatch(loginSuccess(res));
  } catch (e) {
    message.error(e.message);
    dispatch(loginFailed());
    return console.error(e.message);
  }
};
export const logout = () => async (dispatch) => {
  try {
    // fetchLogout();
    fetch('/api/removeToken', {
      method: 'POST',
    });
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};

export const register =
  ({ name, email, password, ...query }) =>
  async (dispatch) => {
    dispatch(loginFetch());
    try {
      const res = await fetchRegister({
        firstName: name,
        lastName: name,
        email,
        password,
        ...query,
      });
      message.success("Your account have been created successfully!");

      fetch('/api/token', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: res?.accessToken,
        }),
      })
      dispatch(loginSuccess(res));
    } catch (e) {
      message.error(e.message);
      dispatch(loginFailed());
      return console.error(e.message);
    }
  };

export const getProfile = () => async (dispatch) => {
  dispatch(loginFetch());
  try {
    const res = await fetchProfile();
    console.log("resProfile", res);
    dispatch(profileSuccess(res));
  } catch (e) {
    // message.error(e.message);
    dispatch(loginFailed());
    return console.error(e.message);
  }
};

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (payload, thunkAPI) => {
    try {
      const { credential } = await loginWithGoogleFirebaseApi();
      const { data } = await apiWrapper({}, loginWithGoogleApi, {
        access_token: credential?.idToken,
      });
      if (data) {
        thunkAPI.dispatch(loginSuccess(data));
        // setAuthToken(data.accessToken);
        // setRefreshToken(data.refreshToken);
        // setInitHeader();
        // thunkAPI.dispatch(getCurrentUser());
        return data;
      }
      return thunkAPI.rejectWithValue(data);
    } catch (error) {
      // console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const loginWithFacebook = createAsyncThunk(
  'auth/loginWithFacebook',
  async (payload, thunkAPI) => {
    try {
      const { credential } = await loginWithFacebookFirebaseApi();
      const { data } = await apiWrapper({}, loginWithFacebookApi, {
        access_token: credential?.accessToken,
      });
      if (data) {
        thunkAPI.dispatch(loginSuccess(data));
        // setAuthToken(data.accessToken);
        // setRefreshToken(data.refreshToken);
        // setInitHeader();
        // thunkAPI.dispatch(getCurrentUser());
        return data;
      }
      return thunkAPI.rejectWithValue(data);
    } catch (error) {
      // console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);