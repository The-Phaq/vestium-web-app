import { makeActions } from 'store/crudCreator/actions';

export const MODEL_NAME = 'emojis';
export const emojisActions = makeActions(MODEL_NAME);

export const getAllEmojis = emojisActions.getAll;
export const editEmojis = emojisActions.edit;
export const createEmojis = emojisActions.create;
export const getByIdEmojis = emojisActions.getDataById;
export const setCurrentEmojis = emojisActions.setCurrent;