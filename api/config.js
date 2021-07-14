import { get } from './utils';

export const getConfigNewLookApi = () => get('/config/newlooks');

export const getConfigCategoriesApi = () => get('/config/category');

export const getConfigBoutiqueApi = () => get('/config/item');