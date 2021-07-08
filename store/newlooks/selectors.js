import { createSelector } from "reselect";
import { CRUDSelectors } from "store/crudCreator/selectors";
import { MODEL_NAME } from "./actions";

export const newlooksSelectors = new CRUDSelectors(MODEL_NAME);

const getNewLooks = state => state.newlooks.data;
const getNewLookIds = state => state.newlooks.ids;

export const getNewLooksSelectors = createSelector(
  [getNewLooks, getNewLookIds],
  (newLookData, newLookIds) => {
    return newLookIds.map(id => ({
      ...newLookData[id],
      id: newLookData[id]?._id,
      img: newLookData[id]?.image?.url || newLookData[id]?.url || '/images/newLook.png',
      votes:  0,
      shares: 46,
      followers:  0,
      items: newLookData[id]?.items?.map(item => ({
        ...item,
        id: item?.itemId?._id,
        _id: item?.itemId?._id,
        name: item?.itemId?.name,
        brand: item?.itemId?.brand,
        price: item?.itemId?.price,
        img: item?.url || item?.itemId?.image?.url,
      })),
    }));
  },
);
