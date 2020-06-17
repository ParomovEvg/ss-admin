import { useAction } from '../../hooks/use-action';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useSelectorFactory } from '../../hooks/use-selector-factory';
import {
  asyncTextFieldActions,
  updateTextFieldNameFactory,
  updateTextFieldDescriptionFactory,
  updateTextFieldIdModalSelector,
} from '../../redux/slices/textFieldsSlice';
import { UpdateFieldModal$ } from './UpdateFieldModal.fipc';

export const UpdateTextFieldModal = UpdateFieldModal$({
  useUpdateModalProps: () => {
    const updateTextField_async = useAction(
      asyncTextFieldActions.updateTextField_async
    );

    const updateFormHandler = useCallback(
      (values, action) => {
        updateTextField_async({ values, action });
      },
      [updateTextField_async]
    );

    return {
      updateFormHandler,
    };
  },
  useInitialValues: () => {
    const id = useSelector(updateTextFieldIdModalSelector);
    const name = useSelectorFactory(updateTextFieldNameFactory, id);
    const description = useSelectorFactory(
      updateTextFieldDescriptionFactory,
      id
    );
    return {
      name,
      description,
    };
  },
});
