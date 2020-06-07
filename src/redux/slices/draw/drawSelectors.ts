import { RootState } from './../../createStore';
import { createSelector } from '@reduxjs/toolkit';
import { drawType } from './drawListSlice';
export const drawsIsLoadingSelector = (state: RootState) =>
  state.draws.isLoading;
export const drawsSelector = (state: RootState) => state.draws.items;
export const drawNowSelector = (state: RootState) => state.draws.now;
export const updateDrawIdSelector = (state: RootState) => state.draws.updateId;

export const drawsListSelector = createSelector(drawsSelector, (items) =>
  items.ids.reduce((acc: drawType[], id) => {
    const draw = items.entities[id];
    if (draw !== undefined) {
      acc.push(draw);
    }
    return acc;
  }, [])
);

export const drawNowEndSelector = createSelector(
  drawNowSelector,
  (now) => now?.end ?? ''
);

export const allDrawIsLoadingSelector = createSelector(
  drawsIsLoadingSelector,
  (isLoading) => isLoading
);

export const drawIsLoadingFactory = (id: number) =>
  createSelector(
    drawsSelector,
    (items) => items.entities[id]?.isLoading ?? false
  );
