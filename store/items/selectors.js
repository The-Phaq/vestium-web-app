import { CRUDSelectors } from 'store/crudCreator/selectors';
import { MODEL_NAME } from './actions';

export const itemsSelectors = new CRUDSelectors(MODEL_NAME);
