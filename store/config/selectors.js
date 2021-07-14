import { createSelector } from "reselect";

const getConfigData = state => state.config.data;
const getBoutiqueConfigData = state => state.config.boutiqueData;

const configSource = {
  Occasion: 'occasionIds',
  Style: 'stylesIds',
  Season: 'seasonIds',
  Color: 'colorIds',
}

const boutiqueConfigSource = {
  Category: 'categoryId.$in',
  Figure: 'figureIds.$all',
}

export const getConfigSelector = createSelector(
  [getConfigData],
  (configData) => {
    return configData?.filter(config => !!configSource[config?.collection])?.map(config => ({
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
      source: boutiqueConfigSource[config?.collection],
    }));
  },
);
