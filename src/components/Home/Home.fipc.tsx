import { Home$ } from './Home';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAction } from '../../hooks/use-action';
import { screensActions } from '../../redux/slices/screensSlice';
import { RootState } from '../../redux/createStore';
import { useSelector } from 'react-redux';
import { fieldsType } from '../../redux/slices/fieldsSlice';

export const Home = Home$({
  useFields: () => {
    const { id } = useParams<{ id: string }>();

    const getScreenRequest = useAction(screensActions.getScreenRequest);

    useEffect(() => {
      getScreenRequest(parseInt(id));
    }, [id]);
    return useSelector<RootState, fieldsType>((state) => state.fields);
  },
});
