import { makeActions } from 'store/crudCreator/actions';

export const MODEL_NAME = 'backgrounds';
export const backgroundsActions = makeActions(MODEL_NAME);

export const getAllBackgrounds = backgroundsActions.getAll;
export const editBackgrounds = backgroundsActions.edit;
export const createBackgrounds = backgroundsActions.create;
export const getByIdBackgrounds = backgroundsActions.getDataById;
export const setCurrentBackgrounds = backgroundsActions.setCurrent;