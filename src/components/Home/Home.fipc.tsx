import { Home$ } from './Home';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAction } from '../../hooks/use-action';
import { asyncScreenActions } from '../../redux/slices/screensSlice';
import { RootState } from '../../redux/createStore';
import { useSelector } from 'react-redux';
import { fieldsType } from '../../redux/slices/fieldsSlice';

export const Home = Home$({
  useFields: () => {
    const { id } = useParams<{ id: string }>();
    const status = useSelector<RootState, string>(
      (state) =>
        state.screens.screensList.find((screen) => screen.id === parseInt(id))
          ?.status ?? 'done'
    );

    const getScreen = useAction(asyncScreenActions.getScreen);

    useEffect(() => {
      getScreen(parseInt(id));
    }, [id]);

    return [
      useSelector<RootState, fieldsType>((state) => state.fields),
      status,
    ];
  },
  useAddField: () => {
    const [addFieldModalState, setAddFieldModalState] = useState<boolean>(
      false
    );
    const toggleAddFieldModal = useCallback(() => {
      setAddFieldModalState((addModalState) => !addModalState);
    }, []);
    return [toggleAddFieldModal, addFieldModalState];
  },
});
