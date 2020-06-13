import { AddImgFieldModal$ } from './AddImgFieldModal';
import { useAction } from '../../hooks/use-action';
import { viewActions } from '../../redux/slices/viewSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';
import { useCallback } from 'react';
import {
  imgFieldsActions,
  imgFieldsActionsAsync,
} from '../../redux/slices/imgFieldsSlice';

export type useAddImgFieldModalProps = (
  id: number
) => {
  closeAddImgFieldModal: () => void;
  addImgFieldModalState: boolean;
  addImgFieldName: string;
  addImgFieldDescription: string;
  addImgFieldFormInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addImgFieldFormHandler: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const AddImgFieldModal = AddImgFieldModal$({
  useAddImgFieldModalProps: (id) => {
    const closeAddImgFieldModal = useAction(viewActions.closeAddImgFieldModal);
    const addImgFieldModalState = useSelector<RootState, boolean>(
      (state) => state.view.AddImgFieldModal
    );
    const addImgFieldName = useSelector<RootState, string>(
      (state) => state.imgFields.addImgFieldName
    );
    const addImgFieldDescription = useSelector<RootState, string>(
      (state) => state.imgFields?.addImgFieldDescription ?? ''
    );

    const setAddImgFieldName = useAction(imgFieldsActions.setAddImgFieldName);
    const setAddImgFieldDescription = useAction(
      imgFieldsActions.setAddImgFieldDescription
    );
    const addImgFieldFormInputHandler = useCallback(
      (e) => {
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
          case 'name':
            setAddImgFieldName(value);
            break;
          case 'description':
            setAddImgFieldDescription(value);
            break;
        }
      },
      [setAddImgFieldName, setAddImgFieldDescription]
    );
    const addImgFieldAsync = useAction(imgFieldsActionsAsync.addImgFieldAsync);
    const addImgFieldFormHandler = useCallback(
      (e) => {
        e.preventDefault();
        addImgFieldAsync(id);
      },
      [addImgFieldAsync, id]
    );
    return {
      addImgFieldFormHandler,
      addImgFieldModalState,
      addImgFieldFormInputHandler,
      addImgFieldName,
      addImgFieldDescription,
      closeAddImgFieldModal,
    };
  },
});
