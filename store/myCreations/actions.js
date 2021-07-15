import { makeActions } from 'store/crudCreator/actions';

export const MODEL_NAME = 'myCreations';
export const myCreationsActions = makeActions(MODEL_NAME, 'newlooks/me');

export const getAllMyCreations = myCreationsActions.getAll;
export const editMyCreations = myCreationsActions.edit;
export const createMyCreations = myCreationsActions.create;
export const getByIdMyCreations = myCreationsActions.getDataById;
export const setCurrentMyCreations = myCreationsActions.setCurrent;