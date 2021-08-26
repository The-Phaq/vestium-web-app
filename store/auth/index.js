import { createSlice } from '@reduxjs/toolkit';
import { updateProfile } from './asyncActions';

let initialUser = null;
let initialToken = null;
if (typeof window !== 'undefined') {
    initialUser = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null;
    initialToken = localStorage.getItem('token')
        ? localStorage.getItem('token')
        : null;
}

const slice = createSlice({
    name: 'user',
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
            localStorage.setItem('user', JSON.stringify(action.payload.data));
            localStorage.setItem('token', action.payload.accessToken);
        },
        loginFailed: (state, action) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
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
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        profileSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
    },
    extraReducers: {
        [updateProfile.fulfilled]: (state, { payload }) => {
            state.user = {
                ...state.user,
                ...payload,
            }
        },
    },
});
export default slice;
