import { asyncFieldActions } from './../../redux/slices/fieldsSlice';
import { valuesActions } from '../../redux/slices/fieldValuesSlice';
import { RootState } from '../../redux/createStore';
import { useSelector } from 'react-redux';
import { useCallback, useState, useEffect } from 'react';
import { TextCard$ } from './TextCard';
import { valueType } from '../../redux/slices/fieldValuesSlice';
import { useAction } from '../../hooks/use-action';
import { last } from 'lodash';

export type textField = (
  fieldId: number,
  name: string
) => {
  value?: string;
  onChange: (value: string) => void;
  onSave: () => void;
  isSave: boolean;
  onReset: () => void;
  isReset: boolean;
  onBack: () => void;
  isLoading: boolean;
  deleteFieldModal: () => void;
  deleteFieldHandler: () => void;
  isModalDeleteFieldOpen: boolean;
  closeModalDeleteField: () => void;
};

export const useCreateTextFiled: textField = (fieldId) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setValueStatus: string = useSelector<RootState, string>(
    (state) => state.fields.find((field) => field.id === fieldId)?.status ?? ''
  );

  useEffect(() => {
    setIsLoading(setValueStatus === 'loading');
  }, [setValueStatus]);

  const setFieldValueRequest = useAction(valuesActions.setFieldValueRequest);
  const values: valueType[] = useSelector<RootState, valueType[]>((state) => {
    return state.values.filter((value) => value.fieldId === fieldId);
  });

  const [lastValue, setLastValue] = useState(last(values));
  const [text, setText] = useState<string>(last(values)?.value ?? '');

  const isSave = useIsSave(text, values, isLoading);
  const onSave = useCallback(() => {
    setFieldValueRequest({ text, fieldId });
  }, [setFieldValueRequest, text, fieldId]);

  const isReset = useIsReset(text, values, lastValue, isLoading);
  const onReset = useCallback(() => {
    if (isReset) {
      setText(last(values)?.value ?? '');
      setLastValue(last(values));
    }
  }, [setText, isReset, setLastValue, values]);

  const onBack = useCallback(() => {
    if (lastValue !== undefined) {
      const prevIndex = values.indexOf(lastValue) - 1;
      setLastValue(values[prevIndex]);

      setText(values[prevIndex]?.value ?? 'все хватит, АСТАНАВИСЬ');
    }
  }, [lastValue, values]);

  const [isModalDeleteFieldOpen, setIsModalDeleteFieldOpen] = useState(false);
  const deleteFieldModal = useCallback(() => {
    setIsModalDeleteFieldOpen(true);
  }, [setIsModalDeleteFieldOpen]);
  const closeModalDeleteField = useCallback(() => {
    setIsModalDeleteFieldOpen(false);
  }, [setIsModalDeleteFieldOpen]);

  const deleteField = useAction(asyncFieldActions.deleteFieldAsync);
  const deleteFieldHandler = useCallback(() => {
    setIsModalDeleteFieldOpen(false);
    deleteField(fieldId);
  }, [fieldId, deleteField]);

  return {
    value: text,
    onChange: setText,
    onSave,
    isSave,
    onReset,
    isReset,
    onBack,
    isLoading,
    deleteFieldModal,
    deleteFieldHandler,
    isModalDeleteFieldOpen,
    closeModalDeleteField,
  };
};

const useIsReset = (
  text: string,
  values: valueType[],
  lastValue: valueType | undefined,
  isLoading: boolean
) => {
  const isTextChange = text !== last(values)?.value ?? text;
  return isTextChange && !isLoading;
};

const useIsSave = (text: string, values: valueType[], isLoading: boolean) => {
  const isTextChange = text !== last(values)?.value ?? text;
  return isTextChange && !isLoading;
};

export const TextCard = TextCard$({ textField: useCreateTextFiled });
