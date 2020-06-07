import { ModalConf$ } from '../ModalConf/ModalConf';
export const DeleteModal$ = ModalConf$({
  $carry: true,
  useBtnRightText: () => 'Отменить',
  useBtnLeftText: () => 'Удалить',
});
