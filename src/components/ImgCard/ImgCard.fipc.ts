import { last } from 'lodash';
import {
  imgFieldsActionsAsync,
  imgFieldsActions,
} from './../../redux/slices/imgFieldsSlice';
import { RootState } from './../../redux/createStore';
import { useSelector } from 'react-redux';
import { ImgCard$ } from './ImgCard';
import { useCallback, useState, useEffect } from 'react';
import { useAction } from '../../hooks/use-action';
import { ImgDto } from '../../apiWorker/typings';

const useSave = (url: string | undefined, id: number) => {
  const [isSave, setIsSave] = useState<boolean>(true);
  const addImgAsync = useAction(imgFieldsActionsAsync.addImg_async);

  const onSave = useCallback(() => {
    addImgAsync(id);
  }, [addImgAsync, id]);

  useEffect(() => {
    setIsSave(url !== undefined);
  }, [url]);

  return {
    onSave,
    isSave,
  };
};

export const ImgCard = ImgCard$({
  useImgField: (id) => {
    const url: string | undefined = useSelector<RootState, string | undefined>(
      (state) =>
        state.imgFields.items.find((imgField) => imgField.id === id)
          ?.addImgValue
    );

    const isLoading = useSelector<RootState, boolean>(
      (state) =>
        state.imgFields.items.find((imgField) => imgField.id === id)
          ?.isLoading ?? false
    );

    const addImgValue = useAction(imgFieldsActions.addImgValue);
    const onChangeDropZone = useCallback(
      async (acceptedFiles) => {
        const lastFile: File | undefined = last(acceptedFiles);
        const newUrl = URL.createObjectURL(lastFile);
        if (lastFile !== undefined) {
          addImgValue({
            newUrl,
            id,
          });
        }
      },
      [addImgValue, id]
    );

    const images = useSelector<RootState, ImgDto[]>(
      (state) =>
        state.imgFields.items.find((imgField) => imgField.id === id)?.img ?? []
    );

    const [lastValue, setLastValue] = useState<ImgDto | undefined>(
      last(images)
    );

    useEffect(() => {
      setLastValue(last(images));
    }, [images]);

    // const isReset = useIsReset(text, values, lastValue, isLoading);
    // const onReset = useCallback(() => {
    //   if (isReset) {
    //     setText(last(values)?.value ?? '');
    //     setLastValue(last(values));
    //   }
    // }, [setText, isReset, setLastValue, values]);

    const [isBack, setIsBack] = useState<boolean>(lastValue !== undefined);

    useEffect(() => {
      if (lastValue !== undefined) {
        const prevIndex = images.indexOf(lastValue) - 1;
        setIsBack(images[prevIndex] !== undefined);
      }
    }, [lastValue]);

    const onBack = useCallback(async () => {
      if (lastValue !== undefined) {
        const prevIndex = images.indexOf(lastValue) - 1;
        const newLastValue = images[prevIndex];
        setLastValue(newLastValue);
        addImgValue({
          newUrl: newLastValue.url,
          id,
        });
      }
    }, [lastValue, images, addImgValue, id]);

    const { onSave, isSave } = useSave(url, id);

    return {
      isLoading,
      onChangeDropZone,
      onSave,
      isSave,
      isBack,
      onBack,
      url: url ?? lastValue?.url ?? '',
    };
  },
});
