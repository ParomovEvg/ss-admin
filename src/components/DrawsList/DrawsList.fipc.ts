import {
  drawsListSelector,
  allDrawIsLoadingSelector,
  drawNowSelector,
} from './../../redux/slices/draw/drawSelectors';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { DrawsList$ } from './DrawsListComponent';
import { useAction } from '../../hooks/use-action';
import { drawListActions } from '../../redux/slices/draw/drawListSlice';
import { drawViewActions } from '../../redux/slices/draw/drawView';
import { drawNowActions } from '../../redux/slices/draw/drawNow';

export const DrawsList = DrawsList$({
  useDrawsList: () => {
    const getAllDraw = useAction(drawListActions.getAll);
    const getNowDraw = useAction(drawNowActions.get);
    useEffect(() => {
      getAllDraw();
      getNowDraw();
    }, []);
  },

  useIsLoading: () => useSelector(allDrawIsLoadingSelector),

  useOpenAddDrawModal: () => useAction(drawViewActions.openAddDrawModal),

  useAllDraw: () => useSelector(drawsListSelector),
  useNowDraw: () => useSelector(drawNowSelector),
});
