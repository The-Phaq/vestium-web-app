import { createSelector } from 'reselect';

const getFigures = state => state.figures.data;

export const getFiguresSelectors = createSelector(
  [getFigures],
  figures => {
    const figureKeys = Object.keys(figures);
    return figureKeys.map(key => ({
      text: key,
      items: figures?.[key]?.map(item => ({
        // eslint-disable-next-line
        id: item._id,
        text: item.name,
      })),
    }))
  },
)