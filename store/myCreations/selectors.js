import { createSelector } from "reselect";
import { CRUDSelectors } from "store/crudCreator/selectors";
import { MODEL_NAME } from "./actions";

export const myCreationsSelectors = new CRUDSelectors(MODEL_NAME);

const getMyCreations = state => state.myCreations.data;
const getMyCreationIds = state => state.myCreations.ids;

export const getMyCreationsSelectors = createSelector(
  [getMyCreations, getMyCreationIds],
  (newLookData, newLookIds) => {
    return newLookIds.map(id => ({
      ...newLookData[id],
      id: newLookData[id]?._id,
      img: newLookData[id]?.image?.url || newLookData[id]?.url,
      votes:  newLookData[id]?.likeCount || 0,
      shares: newLookData[id]?.shareCount || 0,
      favorites: newLookData[id]?.favoriteCount || 0,
      followers: newLookData[id]?.followCount || 0,
      items: newLookData[id]?.items?.map(item => ({
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
