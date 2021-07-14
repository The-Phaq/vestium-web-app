import { makeActions } from 'store/crudCreator/actions';

export const MODEL_NAME = 'favorites';
export const favoritesActions = makeActions(MODEL_NAME, 'newlooks/favorite');

export const getAllFavorites = favoritesActions.getAll;
export const editFavorites = favoritesActions.edit;
export const createFavorites = favoritesActions.create;
export const getByIdFavorites = favoritesActions.getDataById;
export const setCurrentFavorites = favoritesActions.setCurrent;