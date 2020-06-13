import { AddTextFieldModal$ } from './AddTextFieldModal';
import { useAction } from '../../hooks/use-action';
import { viewActions } from '../../redux/slices/viewSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';
import {
  TextFieldsActions,
  asyncTextFieldActions,
} from '../../redux/slices/textFieldsSlice';
import { useCallback } from 'react';

export type useAddTextFieldModalProps = (
  id: number
) => {
  closeAddTextFieldModal: () => void;
  addTextFieldModalState: boolean;
  addTextFieldName: string;
  addTextFieldValue: string;
  addTextFieldDescription: string;
  addTextFieldFormInputHandler: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  addTextFieldFormHandler: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const AddTextFieldModal = AddTextFieldModal$({
  useAddTextFieldModalProps: (id) => {
    const closeAddTextFieldModal = useAction(
      viewActions.closeAddTextFieldModal
    );
    const addTextFieldModalState = useSelector<RootState, boolean>(
      (state) => state.view.AddTextFieldModal
    );
    const addTextFieldName = useSelector<RootState, string>(
      (state) => state.TextFields.addTextfieldName
    );
    const addTextFieldValue = useSelector<RootState, string>(
      (state) => state.TextFields.addTextFieldValue
    );
    const addTextFieldDescription = useSelector<RootState, string>(
      (state) => state.TextFields.addTextFieldDescription
    );

    const setAddFieldName = useAction(TextFieldsActions.setAddTextFieldName);
    const setAddFieldValue = useAction(TextFieldsActions.setAddTextFieldValue);
    const setAddTextFieldDescription = useAction(
      TextFieldsActions.setAddTextFieldDescription
    );

    const addTextFieldFormInputHandler = useCallback(
      (e) => {
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
          case 'name':
            setAddFieldName(value);
            break;
          case 'value':
            setAddFieldValue(value);
            break;
          case 'description':
            setAddTextFieldDescription(value);
            break;
        }
      },

      [setAddFieldName, setAddFieldValue, setAddTextFieldDescription]
    );
    const addTextFieldAsync = useAction(
      asyncTextFieldActions.addTextFieldAsync
    );
    const addTextFieldFormHandler = useCallback(
      (e) => {
        e.preventDefault();
        addTextFieldAsync(id);
      },
      [addTextFieldAsync, id]
    );
    return {
      addTextFieldFormHandler,
      addTextFieldModalState,
      addTextFieldFormInputHandler,
      addTextFieldName,
      addTextFieldValue,
      addTextFieldDescription,
      closeAddTextFieldModal,
    };
  },
});
