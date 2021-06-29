import { makeCRUDSlice } from 'store/crudCreator';
import { MODEL_NAME, newlooksActions } from './actions';

const slice = makeCRUDSlice(MODEL_NAME, newlooksActions);

export default slice.reducer;
