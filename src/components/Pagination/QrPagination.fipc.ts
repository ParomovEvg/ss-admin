import { useSelector } from 'react-redux';

import { useAction } from '../../hooks/use-action';
import { qrPaginationActions } from '../../redux/slices/qr/qrPagination.slice';
import {
  qrPaginationPageSelector,
  qrPaginationCountSelector,
} from '../../redux/slices/qr/qrSelectors';
import { Pagination$ } from './Pagination.fipc';

export const QrPagination = Pagination$({
  useOnChange: () => {
    const setQrPagination = useAction(qrPaginationActions.setPage);
    return (e, v) => setQrPagination(v);
  },
  usePage: () => useSelector(qrPaginationPageSelector),
  useCount: () => useSelector(qrPaginationCountSelector),
});
