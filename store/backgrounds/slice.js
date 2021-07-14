import { makeCRUDSlice } from 'store/crudCreator';
import { MODEL_NAME, backgroundsActions } from './actions';

const slice = makeCRUDSlice(MODEL_NAME, backgroundsActions);

export default slice.reducer;
