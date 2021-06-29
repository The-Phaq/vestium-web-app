import { makeActions } from 'store/crudCreator/actions';

export const MODEL_NAME = 'newlooks';
export const newlooksActions = makeActions(MODEL_NAME);

export const getAllNewlooks = newlooksActions.getAll;
export const editNewlooks = newlooksActions.edit;
export const createNewlooks = newlooksActions.create;
export const getByIdNewlooks = newlooksActions.getDataById;
export const setCurrentNewlooks = newlooksActions.setCurrent;