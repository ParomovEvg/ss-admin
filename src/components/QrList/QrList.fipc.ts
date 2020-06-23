import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { qrType } from './../../redux/slices/qr/qrList.slice';
import { checkoutAsymcActions } from './../../redux/slices/checkoutSlice';
import { drawListActions } from './../../redux/slices/draw/drawListSlice';
import { QrList$ } from './QrList.component';
import { useAction } from '../../hooks/use-action';
import {
  qrLoadingSelector,
  qrListSelector,
} from '../../redux/slices/qr/qrSelectors';

export interface QrListHooks {
  useEffectQr: () => void;
  useLoading: () => boolean;
  useQrs: () => qrType[];
}

export const QrList = QrList$({
  useEffectQr: () => {
    const getDraws_async = useAction(drawListActions.getAll);
    const getCheckouts_async = useAction(
      checkoutAsymcActions.getAllCheckoutAsync
    );

    useEffect(() => {
      getDraws_async();
      getCheckouts_async();
    }, []);
  },
  useLoading: () => useSelector(qrLoadingSelector),
  useQrs: () => useSelector(qrListSelector),
});
