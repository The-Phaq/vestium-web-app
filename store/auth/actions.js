import { message } from "antd";
import {
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchProfile,
} from "../../api/user";
import slice from "./index";

const { loginSuccess, logoutSuccess, loginFetch, loginFailed, profileSuccess } =
  slice.actions;
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
