import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { qrType } from './../../redux/slices/qr/qrList.slice';
import { QrList$ } from './QrList.component';
import { useAction } from '../../hooks/use-action';
import {
  qrLoadingSelector,
  qrListSelector,
} from '../../redux/slices/qr/qrSelectors';
import { qrFilterActions } from '../../redux/slices/qr/filterQrsSlice';

export interface QrListHooks {
  useEffectQr: () => void;
  useLoading: () => boolean;
  useQrs: () => qrType[];
}

export const QrList = QrList$({
  useEffectQr: () => {
    const filterQr = useAction(qrFilterActions.filterQr);
    useEffect(() => {
      filterQr();
    }, []);
  },
  useLoading: () => useSelector(qrLoadingSelector),
  useQrs: () => useSelector(qrListSelector),
});
