import { makeActions } from 'store/crudCreator/actions';

export const MODEL_NAME = 'items';
export const itemsActions = makeActions(MODEL_NAME);

export const getAllItems = itemsActions.getAll;
export const editItems = itemsActions.edit;
export const createItems = itemsActions.create;
export const getByIdItems = itemsActions.getDataById;
export const setCurrentItems = itemsActions.setCurrent;