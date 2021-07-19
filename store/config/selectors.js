import { createSelector } from "reselect";
import xor from 'lodash/xor';

const getConfigData = state => state.config.data;
const getBoutiqueConfigData = state => state.config.boutiqueData;

const configSource = {
  Occasion: 'occasionIds',
  Style: 'stylesIds',
  Season: 'seasonIds',
  Color: 'colorIds',
}

const boutiqueConfigSource = {
  Category: {
    source: 'categoryId',
    getData: item => item?._id,
    validateData: (prev, id) => prev !== id,
    getActive: (prev, item) => prev === item?._id,
  },
  Brand: {
    source: 'brand.$in',
    getData: (item, prev = []) => xor(prev, [item?.name]),
    validateData: () => true,
    getActive: (prev = [], item) => prev?.includes(item?.name),
  },
  Color: {
    source: 'colorSourceIds.$all',
    getData: (item, prev = []) => xor(prev, [item?._id]),
    validateData: () => true,
    getActive: (prev = [], item) => prev?.includes(item?._id),
  },
  Price: 'price',
  // Figure: 'figureIds.$all',
}

export const getConfigSelector = createSelector(
  [getConfigData],
  (configData) => {
    return configData?.filter(config => !!configSource[config?.name])?.map(config => ({
      ...config,
      id: config._id,
      source: configSource[config?.name],
    }));
  },
);

export const getBoutiqueConfigSelector = createSelector(
  [getBoutiqueConfigData],
  (configData) => {
    return configData?.filter(config => !!boutiqueConfigSource[config?.collection])?.map(config => ({
      ...config,
      id: config._id,
      filterType: boutiqueConfigSource[config?.collection],
    }));
  },
);
