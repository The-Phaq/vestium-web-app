import { makeCRUDSlice } from 'store/crudCreator';
import { MODEL_NAME, favoritesActions } from './actions';

const slice = makeCRUDSlice(MODEL_NAME, favoritesActions);

export default slice.reducer;
