import { message } from 'antd';
import {
    fetchLogin,
    fetchLogout,
    fetchRegister,
    fetchProfile,
} from '../../api/user';
import slice from './index';

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
export const logout = () => async (dispatch) => {
    try {
        const res = await fetchLogout();
        return dispatch(logoutSuccess());
    } catch (e) {
        return console.error(e.message);
    }
};

export const register =
    ({ name, email, password }) =>
    async (dispatch) => {
        dispatch(loginFetch());
        try {
            const res = await fetchRegister({
                firstName: name,
                lastName: name,
                email,
                password,
            });
            console.log('res', res);
            message.success('Your account have bên create successfully!');
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
        console.log('resProfile', res);
        // dispatch(loginSuccess(res));
    } catch (e) {
        message.error(e.message);
        // dispatch(loginFailed());
        return console.error(e.message);
    }
};
