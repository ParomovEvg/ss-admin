import * as Yup from 'yup';

export const updateDrawModalValidSchema = Yup.object().shape({
  sLimit: Yup.number().required('Укажите минимальную сумму чека'),
  qrLimit: Yup.number().required(
    'Укажите максимальное количество qr-кодов в день'
  ),
  qrLimitPeriodMS: Yup.number().required(
    'Укажите максимальное количество qr-кодов за все время розыгрыша'
  ),
});
