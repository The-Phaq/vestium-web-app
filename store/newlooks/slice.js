import { makeCRUDSlice } from 'store/crudCreator';
import get from 'lodash/get';
import { MODEL_NAME, newlooksActions, reactNewLook, deleteReactNewLook } from './actions';

const slice = makeCRUDSlice(MODEL_NAME, newlooksActions, {
  [reactNewLook.fulfilled]: (state, { payload }) => {
    state.data = {
      ...state.data,
      [payload.id]: {
        ...get(state.data, payload.id, {}),
        [payload.type]: get(state.data, `${payload.id}.${payload.type}`, 0) + 1,
        [payload.isDone]: true,
      },
    }
    state.currentData = {
      ...state.currentData,
      [payload.type]: get(state.currentData, payload.type, 0) + 1,
      [payload.isDone]: true,
    }
  },
  [deleteReactNewLook.fulfilled]: (state, { payload }) => {
    state.data = {
      ...state.data,
      [payload.id]: {
        ...get(state.data, payload.id, {}),
        [payload.type]: get(state.data, `${payload.id}.${payload.type}`, 1) - 1,
        [payload.isDone]:  false,
      },
    }
    state.currentData = {
      ...state.currentData,
      [payload.type]: get(state.currentData, payload.type, 1) - 1,
      [payload.isDone]: false,
    }
  },
});

export default slice.reducer;
