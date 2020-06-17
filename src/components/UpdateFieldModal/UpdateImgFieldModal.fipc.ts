import { imgFieldsActionsAsync } from '../../redux/slices/imgFieldsSlice';
import { useAction } from '../../hooks/use-action';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useSelectorFactory } from '../../hooks/use-selector-factory';
import {
  updateImgFieldidSelector,
  updateImgFieldNameFactory,
  updateImgFieldDescriptionFactory,
} from '../../redux/slices/imgFieldsSlice';
import { UpdateFieldModal$ } from './UpdateFieldModal.fipc';

export const UpdateImgFieldModal = UpdateFieldModal$({
  useUpdateModalProps: () => {
    const updateImgField_async = useAction(
      imgFieldsActionsAsync.updateImgField_async
    );

    const updateFormHandler = useCallback(
      (values, action) => {
        updateImgField_async({ values, action });
      },
      [updateImgField_async]
    );

    return {
      updateFormHandler,
    };
  },
  useInitialValues: () => {
    const id = useSelector(updateImgFieldidSelector);
    const name = useSelectorFactory(updateImgFieldNameFactory, id);
    const description = useSelectorFactory(
      updateImgFieldDescriptionFactory,
      id
    );
    return {
      name,
      description,
    };
  },
});
