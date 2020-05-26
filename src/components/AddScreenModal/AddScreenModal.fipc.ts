import { asyncScreenActions } from '../../redux/slices/screensSlice';
import { AddScreenModal$ } from './AddScreenModalComponent';
import { useAction } from '../../hooks/use-action';
import { viewActions } from '../../redux/slices/viewSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';
import { useCallback } from 'react';
import { screensActions } from '../../redux/slices/screensSlice';

export type useAddScreenModalProps = () => {
  closeAddScreenModal: () => void;
  AddScreenModalState: boolean;
  addScreenName: string;
  addScreenFormInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addScreenFormHandler: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const AddScreenModal = AddScreenModal$({
  useAddScreenModalProps: () => {
    const closeAddScreenModal = useAction(viewActions.closeAddScreenModal);

    const AddScreenModalState = useSelector<RootState, boolean>(
      (state) => state.view.AddScreenModal
    );
    const addScreenName = useSelector<RootState, string>(
      (state) => state.screens.addScreenName
    );

    const setAddScreenName = useAction(screensActions.setAddScreenName);
    const addScreenFormInputHandler = useCallback((e) => {
      const name = e.target.name;
      const value = e.target.value;
      switch (name) {
        case 'name':
          setAddScreenName(value);
          break;
      }
    }, []);
    const addScreen_async = useAction(asyncScreenActions.addScreen_async);
    const addScreenFormHandler = useCallback(
      (e) => {
        e.preventDefault();
        addScreen_async();
      },
      [addScreen_async]
    );
    return {
      closeAddScreenModal,
      AddScreenModalState,
      addScreenName,
      addScreenFormInputHandler,
      addScreenFormHandler,
    };
  },
});
