import { Screen$ } from './Screen';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAction } from '../../hooks/use-action';
import { asyncScreenActions } from '../../redux/slices/screensSlice';
import { RootState } from '../../redux/createStore';
import { useSelector } from 'react-redux';
import { TextFieldType } from '../../redux/slices/textFieldsSlice';
import { ImgFieldDto } from '../../apiWorker/typings';

const useTextFields = () => {
  const textFields = useSelector<RootState, TextFieldType[]>(
    (state) => state.TextFields.items
  );

  return { textFields };
};

const useIsLoading = () => {
  const { id } = useParams<{ id: string }>();
  const isLoading = useSelector<RootState, boolean>(
    (state) =>
      state.screens.screensList.find((screen) => screen.id === parseInt(id))
        ?.isLoading ?? false
  );
  return {
    isLoading,
  };
};

const useImgFields = () => {
  const imgFields = useSelector<RootState, ImgFieldDto[]>(
    (state) => state.imgFields.items
  );

  return { imgFields };
};

const useFields = () => {
  const { id } = useParams<{ id: string }>();
  const getScreen = useAction(asyncScreenActions.getScreen);
  useEffect(() => {
    getScreen(parseInt(id));
  }, [id]);
};

export const Screen = Screen$({
  useTextFields,
  useIsLoading,
  useImgFields,
  useFields,
});
