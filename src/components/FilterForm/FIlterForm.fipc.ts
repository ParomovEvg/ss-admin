import { GetPhoneDto } from './../../apiWorker/typings/index';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash';

import {
  checkoutListSelector,
  CheckoutType,
  checkoutsisLoadingSelector,
} from './../../redux/slices/checkoutSlice';
import {
  drawsListSelector,
  drawsIsLoadingSelector,
} from './../../redux/slices/draw/drawSelectors';
import { FIlterForm$ } from './FilterForm.component';
import { useAction } from '../../hooks/use-action';
import {
  qrFilterActions,
  IqrFilterState,
} from '../../redux/slices/qr/filterQrsSlice';
import { qrFilterValuesSelector } from '../../redux/slices/qr/qrSelectors';
import { drawType } from '../../redux/slices/draw/drawListSlice';
import { phonesSelector } from '../../redux/slices/authSlice';

export interface FilterFormHooks {
  useHandleChangeInput: () => (e: any) => void;
  useHandlerChangeAutocomplite: () => <N extends keyof IqrFilterState>(
    name: N,
    value: string
  ) => void;
  useValues: () => IqrFilterState;
  useDraws: () => drawType[];
  useCheckouts: () => CheckoutType[];
  useLoading: () => boolean;
  usePhones: () => GetPhoneDto[];
  usePhoneHandler: () => (phone: string) => any;
}

export const useHandleChangeInput = () => {
  const handleChange = useAction(qrFilterActions.changeInput);
  return (e: any) => {
    const { name, value } = e.target;
    handleChange({ name, value });
  };
};

export const FIlterForm = FIlterForm$({
  useHandleChangeInput,
  useHandlerChangeAutocomplite: () => {
    const handleChange = useAction(qrFilterActions.changeInput);
    return (name, value) => {
      handleChange({ name, value });
    };
  },
  useValues: () => useSelector(qrFilterValuesSelector),
  useDraws: () => useSelector(drawsListSelector),
  useCheckouts: () => useSelector(checkoutListSelector),
  useLoading: () => {
    const isLoadingDraws = useSelector(drawsIsLoadingSelector);
    const isLoadingCheckouts = useSelector(checkoutsisLoadingSelector);
    return isLoadingDraws || isLoadingCheckouts;
  },
  usePhones: () => useSelector(phonesSelector),
  usePhoneHandler: () => {
    const phoneHandler = useAction(qrFilterActions.phoneHandler);
    return debounce(phoneHandler, 500);
  },
});
