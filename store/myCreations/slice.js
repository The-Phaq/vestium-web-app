import { makeCRUDSlice } from 'store/crudCreator';
import { MODEL_NAME, myCreationsActions } from './actions';

const slice = makeCRUDSlice(MODEL_NAME, myCreationsActions);

export default slice.reducer;
