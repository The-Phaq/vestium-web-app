import { post, del } from './utils';

export const reactNewLookApi = (id, data) => post(`/reacts/newlooks/${id}`, data);

export const deleteReactNewLookApi = (id, data) => del(`/reacts/newlooks/${id}`, data);

export const reactItemApi = (id, data) => post(`/reacts/items/${id}`, data);

export const deleteReactItemApi = (id, data) => del(`/reacts/items/${id}`, data);