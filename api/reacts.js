import { post, del } from './utils';

export const reactNewLookApi = (id, data) => post(`/reacts/newlooks/${id}`, data);

export const deleteReactNewLookApi = (id, data) => del(`/reacts/newlooks/${id}`, data);