import { markdowmAsyncActions } from './../../redux/slices/markdownFieldSlice';
import { AddMarkdownModal$ } from './AddMarkdownModal';
import { useAction } from '../../hooks/use-action';
import { viewActions } from '../../redux/slices/viewSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';
import { useCallback } from 'react';
import { markdownActions } from '../../redux/slices/markdownFieldSlice';

export type useAddMarkdownFieldModalProps = (
  id: number
) => {
  closeAddMarkdownFieldModal: () => void;
  AddMarkdownFieldModalState: boolean;
  addMarkdownFieldName: string;
  addMarkdownFieldLabel: string;
  addMarkdownFieldFormInputHandler: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  addMarkdownFieldFormHandler: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const AddMarkdownModal = AddMarkdownModal$({
  useAddMarkdownFieldModalProps: (id) => {
    const closeAddMarkdownFieldModal = useAction(
      viewActions.closeAddMarkdownFieldModal
    );
    const AddMarkdownFieldModalState = useSelector<RootState, boolean>(
      (state) => state.view.AddMarkdownFieldModal
    );
    const addMarkdownFieldName = useSelector<RootState, string>(
      (state) => state.markdowmField.addMarkdownFieldName
    );
    const addMarkdownFieldLabel = useSelector<RootState, string>(
      (state) => state.markdowmField.addMarkdownFieldLabel
    );

    const setAddMarkdownFieldName = useAction(
      markdownActions.setAddMarkdownFieldName
    );
    const setAddMarkdownFieldLabel = useAction(
      markdownActions.setAddMarkdownFieldLabel
    );

    const addMarkdownFieldFormInputHandler = useCallback(
      (e) => {
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
          case 'name':
            setAddMarkdownFieldName(value);
            break;
          case 'label':
            setAddMarkdownFieldLabel(value);
            break;
        }
      },
      [setAddMarkdownFieldLabel, setAddMarkdownFieldName]
    );
    const addMarkdownField_async = useAction(
      markdowmAsyncActions.addMarkdownField_async
    );
    const addMarkdownFieldFormHandler = useCallback(
      (e) => {
        e.preventDefault();
        addMarkdownField_async(id);
      },
      [addMarkdownField_async, id]
    );
    return {
      addMarkdownFieldFormHandler,
      AddMarkdownFieldModalState,
      addMarkdownFieldFormInputHandler,
      addMarkdownFieldName,
      addMarkdownFieldLabel,
      closeAddMarkdownFieldModal,
    };
  },
});
