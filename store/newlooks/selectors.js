import { createSelector } from 'reselect';
import { CRUDSelectors } from 'store/crudCreator/selectors';
import { MODEL_NAME } from './actions';

export const newlooksSelectors = new CRUDSelectors(MODEL_NAME);

const getNewLooks = state => state.newlooks.data;
const getNewLookIds = state => state.newlooks.ids;
const getUser = state => state.user.user;

export const getNewLooksSelectors = createSelector(
  [getNewLooks, getNewLookIds, getUser],
  (newLookData, newLookIds, user) => {
    return newLookIds.map(id => ({
      ...newLookData[id],
      id: newLookData[id]?._id,
      img: newLookData[id]?.image?.url || newLookData[id]?.url || '/images/newLook.png',
      user: {
        name: `${user?.firstName || ''} ${user?.lastName || ''}`,
        avatar: user?.avatar,
      },
      votes: user?.pointCount || 0,
      shares: 46,
      followers: user?.followerCount || 0,
      tags: ['office', 'everyDay', 'casual', 'sporty', 'black', 'spring', 'summer', 'medium'],
      items: newLookData[id]?.items?.map(item => ({
        ...item,
        id: item?.itemId?._id,
        _id: item?.itemId?._id,
        name: item?.itemId?.name,
        brandName: 'Gucci',
        price: item?.itemId?.price,
        img: item?.url || item?.itemId?.image?.url,
      })),
    }));
  },
)