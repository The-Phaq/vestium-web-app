import { createSlice } from "@reduxjs/toolkit";

let initialUser = null;
let initialToken = null;
if (typeof window !== "undefined") {
  initialUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  initialToken = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
}

const slice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
    token: initialToken,
    loading: false,
  },

  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.data;
      state.token = action.payload.accessToken;
      state.loading = false;
      localStorage.setItem("user", JSON.stringify(action.payload.data));
      localStorage.setItem("token", action.payload.accessToken);
    },
    loginFailed: (state, action) => {
      state.user = null;
      state.token = null;
      state.loading = false;
    },
    loginFetch: (state, action) => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});
export default slice;
