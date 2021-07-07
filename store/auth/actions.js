import { message } from "antd";
import { fetchLogin, register, fetchLogout } from "../../api/user";
import slice from "./index";

const { loginSuccess, logoutSuccess, loginFetch, loginFailed } = slice.actions;
export const login =
  ({ username, password }) =>
  async (dispatch) => {
    dispatch(loginFetch());
    try {
      const res = await fetchLogin({ email: username, password });
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
    dispatch(loginSuccess(res));
  } catch (e) {
    message.error(e.message);
    dispatch(loginFailed());
    return console.error(e.message);
  }
};
export const logout = () => (dispatch) => {
  try {
    // const res = fetchLogout();
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};
