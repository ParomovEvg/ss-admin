import * as Yup from 'yup';

export const updateFieldModalValidSchema = Yup.object().shape({
  name: Yup.string().required('Укажите имя поля'),
  description: Yup.string().required('Укажите описание поля'),
});
