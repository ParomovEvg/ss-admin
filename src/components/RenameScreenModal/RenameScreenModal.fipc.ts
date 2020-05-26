import {
  screensActions,
  asyncScreenActions,
} from '../../redux/slices/screensSlice';
import { RenameScreenModal$ } from './RenameScreenModalComponent';
import { useAction } from '../../hooks/use-action';
import { viewActions } from '../../redux/slices/viewSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';
import { useCallback, useEffect } from 'react';

export type useRenameScreenType = (
  id: number
) => {
  closeRenameScreenModal: () => void;
  renameScreenModalState: boolean;
  renameScreenName: string;
  renameScreenFormInputHandler: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  renameScreenFormHandler: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const RenameScreenModal = RenameScreenModal$({
  useRenameScreen: (id) => {
    const closeRenameScreenModal = useAction(
      viewActions.closeRenameScreenModal
    );
    const renameScreenModalState = useSelector<RootState, boolean>(
      (state) => state.view.RenameScreenModal
    );
    const renameScreenName = useSelector<RootState, string | null>(
      (state) =>
        state.screens.screensList.find((screen) => screen.id === id)
          ?.renameScreenName ?? null
    );
    const nameScreen = useSelector<RootState, string>(
      (state) =>
        state.screens.screensList.find((screen) => screen.id === id)?.name ?? ''
    );

    const setRenameScreenName = useAction(screensActions.setRenameScreenName);

    const renameScreenFormInputHandler = useCallback((e) => {
      const name = e.target.name;
      const value = e.target.value;
      switch (name) {
        case 'name':
          setRenameScreenName({
            id,
            name: value,
          });
          break;
      }
    }, []);

    const renameScreen_async = useAction(asyncScreenActions.renameScreen_async);
    const renameScreenFormHandler = useCallback(
      (e) => {
        e.preventDefault();
        renameScreen_async(id);
      },
      [id, renameScreen_async]
    );

    return {
      closeRenameScreenModal,
      renameScreenModalState,
      renameScreenName: renameScreenName ? renameScreenName : nameScreen,
      renameScreenFormInputHandler,
      renameScreenFormHandler,
    };
  },
});
