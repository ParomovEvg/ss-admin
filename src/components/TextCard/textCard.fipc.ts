import { asyncFieldActions } from './../../redux/slices/fieldsSlice';
// import { valuesActions } from '../../redux/slices/fieldValuesSlice';
import { RootState } from '../../redux/createStore';
import { useSelector } from 'react-redux';
import { useCallback, useState, useEffect } from 'react';
import { TextCard$ } from './TextCard';
// import { valueType } from '../../redux/slices/fieldValuesSlice';
import { useAction } from '../../hooks/use-action';
import { last } from 'lodash';
import { TextDto } from '../../apiWorker/typings';

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
};

const useIsReset = (
  text: string,
  values: TextDto[],
  lastValue: TextDto | undefined,
  isLoading: boolean
) => {
  const isTextChange = text !== last(values)?.value ?? text;
  return isTextChange && !isLoading;
};

const useIsSave = (text: string, values: TextDto[], isLoading: boolean) => {
  const isTextChange = text !== last(values)?.value ?? text;
  return isTextChange && !isLoading;
};

export const TextCard = TextCard$({
  useTextField: <textField>(fieldId: number) => {
    const setFieldValueRequest = useAction(
      asyncFieldActions.setFieldValueRequest
    );
    const values: TextDto[] = useSelector<RootState, TextDto[]>((state) => {
      return state.fields.find((field) => field.id === fieldId)?.values ?? [];
    });

    const [lastValue, setLastValue] = useState(last(values));
    const [text, setText] = useState<string>(last(values)?.value ?? '');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const setValueStatus: string = useSelector<RootState, string>(
      (state) =>
        state.fields.find((field) => field.id === fieldId)?.status ?? ''
    );

    useEffect(() => {
      setIsLoading(setValueStatus === 'loading');
    }, [setValueStatus]);

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

    return {
      value: text,
      onChange: setText,
      onSave,
      isSave,
      onReset,
      isReset,
      onBack,
      isLoading,
    };
  },
});
