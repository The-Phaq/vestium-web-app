import { makeCRUDSlice } from 'store/crudCreator';
import { MODEL_NAME, itemsActions } from './actions';

const slice = makeCRUDSlice(MODEL_NAME, itemsActions);

export default slice.reducer;
