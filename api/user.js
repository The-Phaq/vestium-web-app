import requestUtils from 'utils/request';
import { put, post, get } from './utils';

export const forgotPasswordApi = data => post('/auth/forgotPassword', data);

export const resetPasswordApi = data => post('/auth/resetPassword', data);

export async function fetchLogin(data) {
    return post('/auth/login', data);
}

export async function register(data) {
    return post('/auth/register', data);
}

export async function fetchLogout(data) {
    return post('/auth/logout', data);
}

export async function fetchRegister(data) {
    return post('/auth/register', data);
}

export async function fetchProfile() {
    return get('/auth/me');
}

export const updateProfileApi = data => put('/auth/me', data);

export const getUserApi = id => get('/users', {
    _id: id,
    page: 1,
    perPage: 1,
    total: 1,
})

export async function loginWithGoogleApi(data) {
    return requestUtils.post('/auth/google', {}, {
        params: data,
    });
}

export async function loginWithFacebookApi(data) {
    return requestUtils.post('/auth/facebook', {}, {
        params: data,
    });
}