import { message } from 'antd';
import { fetchLogin, fetchLogout } from '../../api/user';
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
export const logout = () => async (dispatch) => {
    try {
        const res = await fetchLogout();
        console.log('res', res);
        return dispatch(logoutSuccess());
    } catch (e) {
        return console.error(e.message);
    }
};
