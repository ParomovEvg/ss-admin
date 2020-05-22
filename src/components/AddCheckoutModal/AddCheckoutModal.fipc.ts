import { checkoutAsymcActions } from './../../redux/slices/checkoutSlice';
import { AddCheckoutModal$ } from './AddCheckoutModal';
import { useAction } from '../../hooks/use-action';
import { viewActions } from '../../redux/slices/viewSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';
import { useCallback } from 'react';
import { checkoutActions } from '../../redux/slices/checkoutSlice';

export type useAddCheckoutModalProps = () => {
  closeAddCheckoutModal: () => void;
  addCheckoutModalState: boolean;
  addCheckoutFn: string;
  addCheckoutAddress: string;
  addCheckoutFormInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addCheckoutFormHandler: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const AddCheckoutModal = AddCheckoutModal$({
  useAddCheckoutModalProps: () => {
    const closeAddCheckoutModal = useAction(viewActions.closeAddCheckoutModal);
    const addCheckoutModalState = useSelector<RootState, boolean>(
      (state) => state.view.AddCheckoutModal
    );
    const addCheckoutFn = useSelector<RootState, string>(
      (state) => state.checkouts.addCheckoutFn
    );
    const addCheckoutAddress = useSelector<RootState, string>(
      (state) => state.checkouts.addCheckoutAddress
    );

    const setAddFieldAddress = useAction(checkoutActions.setAddCheckoutAddress);
    const setAddFieldFn = useAction(checkoutActions.setAddCheckoutFn);

    const addCheckoutFormInputHandler = useCallback(
      (e) => {
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
          case 'fn':
            setAddFieldFn(value);
            break;
          case 'address':
            setAddFieldAddress(value);
            break;
        }
      },

      [setAddFieldAddress, setAddFieldFn]
    );
    const addCheckoutAsync = useAction(checkoutAsymcActions.checkoutAdd_async);
    const addCheckoutFormHandler = useCallback(
      (e) => {
        e.preventDefault();
        addCheckoutAsync();
      },
      [addCheckoutAsync]
    );
    return {
      addCheckoutFormHandler,
      addCheckoutModalState,
      addCheckoutFormInputHandler,
      addCheckoutFn,
      addCheckoutAddress,
      closeAddCheckoutModal,
    };
  },
});
