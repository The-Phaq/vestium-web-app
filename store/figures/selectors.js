import { createSelector } from 'reselect';
import flatten from 'lodash/flatten';

const getFigures = state => state.figures.data;

export const getAllFiguresSelectors = createSelector(
  [getFigures],
  figuresData => {
    const figureKeys = Object.keys(figuresData);
    const figures = figureKeys.map(key => figuresData?.[key]?.map(item => ({
      // eslint-disable-next-line
      _id: item._id,
      name: item.name,
    })))
    return flatten(figures)
  },
)

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