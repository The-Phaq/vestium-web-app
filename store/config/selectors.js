import { createSelector } from "reselect";

const getConfigData = state => state.config.data;

const configSource = {
  Occasion: 'occasionIds',
  Style: 'stylesIds',
  Season: 'seasonIds',
  Color: 'colorIds',
}

export const getConfigSelector = createSelector(
  [getConfigData],
  (configData) => {
    return configData?.filter(config => config?.collection !== 'Price')?.map(config => ({
      ...config,
      id: config._id,
      source: configSource[config?.name],
    }));
  },
);
