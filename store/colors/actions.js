import { makeActions } from 'store/crudCreator/actions';

export const MODEL_NAME = 'colors';
export const colorsActions = makeActions(MODEL_NAME);

export const getAllColors = colorsActions.getAll;
export const editColors = colorsActions.edit;
export const createColors = colorsActions.create;
export const getByIdColors = colorsActions.getDataById;
export const setCurrentColors = colorsActions.setCurrent;