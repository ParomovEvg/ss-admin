import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/createStore';

export function useAction<T extends (...args: any) => any>(actionCreator: T) {
  const dispatch = useDispatch<AppDispatch>();
  return (...args: Parameters<T>) => dispatch(actionCreator(...args));
}

type type = {
  [T in 'hello']: string;
};
