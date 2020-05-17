import { Screen$ } from './Screen';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAction } from '../../hooks/use-action';
import { asyncScreenActions } from '../../redux/slices/screensSlice';
import { RootState } from '../../redux/createStore';
import { useSelector } from 'react-redux';
import {
  FieldType,
  asyncFieldActions,
  fieldsActions,
} from '../../redux/slices/fieldsSlice';
import { viewActions } from '../../redux/slices/viewSlice';

export const Screen = Screen$({
  useFields: () => {
    const { id } = useParams<{ id: string }>();
    const status = useSelector<RootState, string>(
      (state) =>
        state.screens.screensList.find((screen) => screen.id === parseInt(id))
          ?.status ?? 'done'
    );

    const fields = useSelector<RootState, FieldType[]>(
      (state) => state.fields.items
    );

    const getScreen = useAction(asyncScreenActions.getScreen);
    useEffect(() => {
      getScreen(parseInt(id));
    }, [id]);
    return { fields, isLoading: status === 'loading' };
  },
  useAddField: () => {
    const { id } = useParams<{ id: string }>();

    const addFieldName = useSelector<RootState, string>(
      (state) => state.fields.addfieldName
    );
    const addFieldValue = useSelector<RootState, string>(
      (state) => state.fields.addFieldValue
    );

    const setAddFieldName = useAction(fieldsActions.setAddFieldName);
    const setAddFieldValue = useAction(fieldsActions.setAddFieldValue);

    const addFieldFormInputHandler = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
          case 'name':
            setAddFieldName(value);
            break;
          case 'value':
            setAddFieldValue(value);
            break;
        }
      },
      [setAddFieldName, setAddFieldValue]
    );
    const addFieldAsync = useAction(asyncFieldActions.addFieldAsync);
    const addFieldFormHandler = useCallback(
      (e) => {
        e.preventDefault();
        addFieldAsync({
          screenId: parseInt(id),
        });
      },
      [addFieldAsync, id]
    );
    return {
      addFieldName,
      addFieldValue,
      addFieldFormInputHandler,
      addFieldFormHandler,
    };
  },
  useAddFieldModa: () => {
    const closeAddFieldModal = useAction(viewActions.closeAddFieldModal);
    const openAddFieldModal = useAction(viewActions.openAddFieldModal);
    const AddFieldModalState = useSelector<RootState, boolean>(
      (state) => state.view.AddFieldModal
    );
    return {
      closeAddFieldModal,
      openAddFieldModal,
      AddFieldModalState,
    };
  },
});
