import {
  drawsListSelector,
  allDrawIsLoadingSelector,
  drawNowSelector,
} from './../../redux/slices/draw/drawSelectors';
import { viewActions } from './../../redux/slices/viewSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { DrawsList$ } from './DrawsListComponent';
import { useAction } from '../../hooks/use-action';
import { drawListActions } from '../../redux/slices/draw/drawListSlice';
import { drawViewActions } from '../../redux/slices/draw/drawView';

export const DrawsList = DrawsList$({
  useDrawsList: () => {
    const getAllDraw = useAction(drawListActions.getAll);
    useEffect(() => {
      getAllDraw();
    }, []);
  },

  useIsLoading: () => useSelector(allDrawIsLoadingSelector),

  useOpenAddDrawModal: () => useAction(drawViewActions.openAddDrawModal),

  useAllDraw: () => useSelector(drawsListSelector),
  useNowDraw: () => useSelector(drawNowSelector),
});
