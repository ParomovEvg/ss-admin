import { createSelector } from '@reduxjs/toolkit';

import { qrType } from './qrList.slice';
import { RootState } from './../../createStore';

export const qrFilterValuesSelector = (state: RootState) => state.qr.filter;

export const qrLoadingSelector = (state: RootState) => state.qr.isLoading;

export const qrFilterDrawIdSelector = (state: RootState) =>
  state.qr.filter.filterByDrawId;

export const qrFilterCheckoutIdSelector = (state: RootState) =>
  state.qr.filter.filterByCheckoutId;

export const qrFilterPhoneSelector = (state: RootState) =>
  state.qr.filter.filterByPhone;

export const qrFilterFdSelector = (state: RootState) =>
  state.qr.filter.filterByFd;

export const qrFilterFpSelector = (state: RootState) =>
  state.qr.filter.filterByFp;

export const qrSelector = (state: RootState) => state.qr.items;

export const qrListSelector = createSelector(qrSelector, ({ ids, entities }) =>
  ids.reduce((acc: qrType[], id) => {
    const qr = entities[id];
    if (qr !== undefined) {
      acc.push(qr);
    }
    return acc;
  }, [])
);
