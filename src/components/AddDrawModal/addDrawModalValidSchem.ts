import * as Yup from 'yup';

export const addDrawModalValidSchema = Yup.object().shape({
  start: Yup.string().required('Укажите начало розыгрыша'),
  end: Yup.string().required('Укажите конец розыгрыша'),
  description: Yup.string().required('Укажите описание розыгрыша'),
  sLimit: Yup.number().required('Укажите минимальную сумму чека'),
  qrLimit: Yup.number().required(
    'Укажите максимальное количество qr-кодов в день'
  ),
  qrLimitPeriodMS: Yup.number().required(
    'Укажите максимальное количество qr-кодов за все время розыгрыша'
  ),
});
