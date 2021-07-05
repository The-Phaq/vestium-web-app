import { post } from './utils';

export async function fetchLogin(data) {
    return post('/auth/login', data);
}

export async function fetchLogout(data) {
    return post('/auth/logout', data);
}
