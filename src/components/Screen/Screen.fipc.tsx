import { Screen$ } from './Screen';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAction } from '../../hooks/use-action';
import { asyncScreenActions } from '../../redux/slices/screensSlice';
import { RootState } from '../../redux/createStore';
import { useSelector } from 'react-redux';

const useIsLoading = (id: number) => {
  const isLoading = useSelector<RootState, boolean>(
    (state) =>
      state.screens.screensList.find((screen) => screen.id === id)?.isLoading ??
      false
  );
  return {
    isLoading,
  };
};

const useFields = (id: number) => {
  const getScreen = useAction(asyncScreenActions.getScreen);
  useEffect(() => {
    getScreen(id);
  }, [id]);
};

export const Screen = Screen$({
  useScreen: () => {
    const { id: ParamId } = useParams<{ id: string }>();
    const id = parseInt(ParamId);
    const { isLoading } = useIsLoading(id);
    // const screendsList;

    const name = useSelector<RootState, string | undefined>(
      (state) =>
        state.screens.screensList.find((screen) => screen.id === id)?.name
    );
    useFields(id);
    return {
      isLoading,
      id,
      name,
    };
  },
});
