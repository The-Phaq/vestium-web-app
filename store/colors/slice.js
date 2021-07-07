import { makeCRUDSlice } from 'store/crudCreator';
import { MODEL_NAME, colorsActions } from './actions';

const slice = makeCRUDSlice(MODEL_NAME, colorsActions);

export default slice.reducer;
