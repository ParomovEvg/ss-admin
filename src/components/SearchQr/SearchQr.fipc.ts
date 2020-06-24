import { useSelector } from 'react-redux';

import { SearchQr$ } from './SearchQr.component';
import {
  IqrFilterState,
  qrFilterActions,
} from '../../redux/slices/qr/filterQrsSlice';
import { qrFilterValuesSelector } from '../../redux/slices/qr/qrSelectors';
import { useHandleChangeInput } from '../FilterForm/FIlterForm.fipc';
import { useAction } from '../../hooks/use-action';

export interface SearchQrHooks {
  useValues: () => IqrFilterState;
  useHandleChangeInput: () => (e: any) => void;
  useFormHandler: () => (e: React.FormEvent<HTMLFormElement>) => void;
}

export const SearchQr = SearchQr$({
  useValues: () => useSelector(qrFilterValuesSelector),
  useHandleChangeInput,
  useFormHandler: () => {
    const filterQr = useAction(qrFilterActions.filterQr);
    return (e) => {
      e.preventDefault();
      filterQr();
    };
  },
});
