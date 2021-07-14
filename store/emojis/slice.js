import { makeCRUDSlice } from 'store/crudCreator';
import { MODEL_NAME, emojisActions } from './actions';

const slice = makeCRUDSlice(MODEL_NAME, emojisActions);

export default slice.reducer;
