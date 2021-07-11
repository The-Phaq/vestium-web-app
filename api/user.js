import { post, get } from './utils';

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

export const getUserApi = id => get('/users', {
    _id: id,
    page: 1,
    perPage: 1,
    total: 1,
})