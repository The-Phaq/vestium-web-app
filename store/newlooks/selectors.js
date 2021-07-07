import { createSelector } from "reselect";
import { CRUDSelectors } from "store/crudCreator/selectors";
import { MODEL_NAME } from "./actions";

export const newlooksSelectors = new CRUDSelectors(MODEL_NAME);

const getNewLooks = (state) => state.newlooks.data;
const getNewLookIds = (state) => state.newlooks.ids;

export const getNewLooksSelectors = createSelector(
  [getNewLooks, getNewLookIds],
  (newLookData, newLookIds) => {
    return newLookIds.map((id) => ({
      ...newLookData[id],
      id: newLookData[id]?._id,
      img: newLookData[id]?.url || "/images/newLook.png",
      votes: 214,
      shares: 46,
      followers: 132,
      tags: [
        "office",
        "everyDay",
        "casual",
        "sporty",
        "black",
        "spring",
        "summer",
        "medium",
      ],
      items: newLookData[id]?.items?.map((item) => ({
        ...item,
        id: item?.itemId?._id,
        _id: item?.itemId?._id,
        name: item?.itemId?.name,
        brandName: "Gucci",
        price: item?.itemId?.price,
        img: item?.url || item?.itemId?.image?.url,
      })),
    }));
  }
);
