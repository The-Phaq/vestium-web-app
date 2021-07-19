import { createSelector } from "reselect";
import { CRUDSelectors } from "store/crudCreator/selectors";
import get from 'lodash/get';
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
      img: newLookData[id]?.image?.url || newLookData[id]?.url,
      votes:  newLookData[id]?.likeCount || 0,
      shares: newLookData[id]?.shareCount || 0,
      favorites: newLookData[id]?.favoriteCount || 0,
      followers: newLookData[id]?.followCount || 0,
      items: get(newLookData, `${id}.items`, []).filter(item => !!item.itemId).map(item => ({
        ...item,
        id: item?.itemId?._id,
        _id: item?.itemId?._id,
        name: item?.itemId?.name,
        brand: item?.itemId?.brand,
        price: item?.itemId?.price,
        img: item?.itemId?.image?.url,
      })),
    }));
  },
);
