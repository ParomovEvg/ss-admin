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

const useSave = (
  url: string | undefined,
  id: number,
  imgId: number | undefined
) => {
  const [isSave, setIsSave] = useState<boolean>(true);
  const addImgAsync = useAction(imgFieldsActionsAsync.addImg_async);
  const addTheSameImg = useAction(imgFieldsActionsAsync.addTheSameImg_async);

  const onSave = useCallback(() => {
    if (imgId) {
      addTheSameImg(id);
    } else {
      addImgAsync(id);
    }
  }, [addImgAsync, addTheSameImg, id, imgId]);

  useEffect(() => {
    setIsSave(url !== undefined);
  }, [url]);

  return {
    onSave,
    isSave,
  };
};

const useReset = (
  url: string | undefined,
  id: number,
  setLastValue: any,
  images: ImgDto[]
) => {
  const [isReset, setIsReset] = useState<boolean>(true);
  const clearAddImg = useAction(imgFieldsActions.clearAddImg);

  useEffect(() => {
    setIsReset(url !== undefined);
  }, [url]);

  const onReset = useCallback(() => {
    if (isReset) {
      clearAddImg(id);
      setLastValue(last(images));
    }
  }, [clearAddImg, id, images, isReset, setLastValue]);
  return {
    isReset,
    onReset,
  };
};

const useBack = (
  images: ImgDto[],
  id: number,
  lastValue: ImgDto | undefined,
  setLastValue: any
) => {
  const addImgValue = useAction(imgFieldsActions.addImgValue);
  const [isBack, setIsBack] = useState<boolean>(lastValue !== undefined);

  useEffect(() => {
    setLastValue(last(images));
  }, [images, setLastValue]);

  useEffect(() => {
    if (lastValue !== undefined) {
      const prevIndex = images.indexOf(lastValue) - 1;
      setIsBack(images[prevIndex] !== undefined);
    }
  }, [images, lastValue]);

  const onBack = useCallback(async () => {
    if (lastValue !== undefined) {
      const prevIndex = images.indexOf(lastValue) - 1;
      const newLastValue = images[prevIndex];
      setLastValue(newLastValue);
      addImgValue({
        newUrl: newLastValue.url,
        addTheSameImgId: newLastValue.id,
        id,
      });
    }
  }, [lastValue, images, setLastValue, addImgValue, id]);
  return {
    onBack,
    isBack,
  };
};

export const ImgCard = ImgCard$({
  useImgField: (id) => {
    const url: string | undefined = useSelector<RootState, string | undefined>(
      (state) =>
        state.imgFields.items.find((imgField) => imgField.id === id)
          ?.addImgValue
    );

    const imgId: number | undefined = useSelector<
      RootState,
      number | undefined
    >(
      (state) =>
        state.imgFields.items.find((imgField) => imgField.id === id)
          ?.addTheSameImgId
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
            addImgValueType: lastFile.type,
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

    const { isReset, onReset } = useReset(url, id, setLastValue, images);
    const { isBack, onBack } = useBack(images, id, lastValue, setLastValue);
    const { onSave, isSave } = useSave(url, id, imgId);

    return {
      isLoading,
      onChangeDropZone,
      onSave,
      isSave,
      isBack,
      onBack,
      isReset,
      onReset,
      url: url ?? lastValue?.url ?? '',
    };
  },
});
