import { ModalConf$ } from '../ModalConf/ModalConf';
import { useAction } from '../../hooks/use-action';
import { viewActions } from '../../redux/slices/viewSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';

export const DeleteModal$ = ModalConf$({
  $carry: true,
  useBtnRightText: () => 'Отменить',
  useBtnLeftText: () => 'Удалить',
  useTitle: () => 'Вы точно хотите удалить это поле?',
});
